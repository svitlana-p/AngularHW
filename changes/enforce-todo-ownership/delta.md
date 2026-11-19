# Change ID: enforce-todo-ownership

## Change

Scope: tighten authorization on the existing Todo mutation endpoints so an authenticated user can update, toggle, or delete only a Todo that belongs to that user AND to the board specified in the URL.

Endpoints affected (URL shape unchanged):
- `PATCH /api/board/:boardId/todo/:todoId` → `updateTodo`
- `PUT /api/board/:boardId/todo/:todoId` → `checkTodo`
- `DELETE /api/board/:boardId/todo/:todoId` → `deleteTodo`

Current behavior (from reconnaissance):
- All three handlers locate the Todo by `_id` only (`Todo.findByIdAndUpdate({ _id: req.params.id })`, `Todo.findById({ _id: req.params.id })`, `Todo.findByIdAndDelete({ _id: req.params.id })`).
- The route is declared with duplicate `:id` parameter names (`/:id/todo/:id`). Handlers read `req.params.id` for the Todo ID; the outer board segment is never read by these handlers, so board membership is not verified.
- `req.user.userId` is available from `authMiddleware` but is never read by these three handlers.
- `getTodos` (reference convention) already filters by both `userId` and `boardId` (`Todo.find({ userId: userId, boardId: boardId })`).

Intended behavior after this change:
- Each handler enforces both conditions: `Todo.userId === req.user.userId` AND `Todo.boardId === boardId` from the URL.
- Route parameters are renamed internally (boardId vs todoId) so the two IDs are distinguishable in handler code; the externally visible URL is not changed.
- A missing Todo and a Todo belonging to another user or another board produce the same HTTP 404 response, to avoid resource enumeration.
- Successful response payloads for authorized owners are preserved.
- HTTP methods and URL shape are kept.
- Out of scope: board mutations, `getTodos`, authentication redesign, unrelated error-handler cleanup.

## Preserved behaviour

"After this change, an authenticated owner must still be able to update, toggle, and delete their own todos through the existing API routes and request formats, with the same successful response payloads."

## ADDED

- Ownership + board-membership precondition in `updateTodo`, `checkTodo`, and `deleteTodo` handlers in `server/src/services/todoServices.js`, keyed on `Todo.userId` === `req.user.userId` and `Todo.boardId` === boardId from the URL.
- Internal route-parameter renaming in `server/src/routers/boardRouter.js` (and corresponding handler references) to distinguish `boardId` (first `:id`) from `todoId` (second `:id`); no external URL change.
- HTTP 404 response for the three indistinguishable cases: Todo not found, Todo owned by another user, Todo belonging to a different board than the one in the URL.

## MODIFIED

- `server/src/services/todoServices.js` — `updateTodo` (lines 40–54), `checkTodo` (lines 56–95), `deleteTodo` (lines 97–105): add userId + boardId filter to the Todo lookup; change missing/forbidden outcome to HTTP 404; preserve success payload shape.
- `server/src/routers/boardRouter.js` — route parameter naming for `/:id/todo/:id` to disambiguate boardId and todoId internally; route registration lines 18, 20, 22 unchanged externally.

## REMOVED

1. **`deleteTodo`: HTTP 200 with body `null` when the Todo does not exist.**
   - Existing: `Todo.findByIdAndDelete({ _id: req.params.id })` returns `null` for a missing todo; the handler does `res.json(null)` → HTTP 200, body `null`.
   - Proposed: missing / not-owned / wrong-board → HTTP 404.
   - Caller-visible impact: A delete of a missing todo that previously returned HTTP 200 `null` (an idempotent-delete signal) now returns HTTP 404. Clients treating HTTP 200+`null` as "already gone" will now see 404.
   - Why REMOVED: current guarantees a 200/null response for a nonexistent todo; the change removes that status/body combination.

2. **`updateTodo` / `checkTodo`: HTTP 400 with a TypeError-derived message when the Todo does not exist.**
   - Existing: `findByIdAndUpdate` / `findById` returns `null`; the subsequent `.save()` / field assignment throws `TypeError: Cannot read properties of null`; caught → `next(error)` → global error handler → HTTP 400 `{ message: <TypeError message> }`.
   - Proposed: missing / not-owned / wrong-board → HTTP 404.
   - Caller-visible impact: Missing-todo responses change from HTTP 400 (leaking a TypeError message) to HTTP 404 (uniform, non-enumerating). Clients asserting on HTTP 400 for "not found" break.
   - Why REMOVED: current guarantees HTTP 400 + TypeError message for a missing todo; the change removes that specific status and error body.

3. **Cross-board mutation by Todo `_id` (board segment of the URL ignored).**
   - Existing: `updateTodo` / `checkTodo` / `deleteTodo` query `{ _id: req.params.id }` only; the board segment of the URL is never checked. `PATCH /api/board/BOARD_A/todo/TODO_X` succeeds even when `TODO_X.boardId === BOARD_B`.
   - Proposed: `Todo.boardId` must equal the boardId in the URL.
   - Caller-visible impact: Mutating a todo through a non-owning board's URL now returns HTTP 404 instead of success. Any caller (e.g., the frontend) that references a todo under the wrong board loses that capability.
   - Why REMOVED: current guarantees board-agnostic mutation by `_id`; the change removes it.

4. **Cross-user mutation by Todo `_id` (ownership ignored).**
   - Existing: `updateTodo` / `checkTodo` / `deleteTodo` never consult `req.user.userId`; any authenticated user can update, toggle, or delete any todo by `_id`.
   - Proposed: `Todo.userId` must equal `req.user.userId`.
   - Caller-visible impact: A different authenticated user can no longer update/toggle/delete another user's todo; receives HTTP 404.
   - Why REMOVED: current guarantees user-agnostic mutation by `_id`; the change removes it.

## REMOVED audit

- `server/src/services/todoServices.js`: The three touched handlers (`updateTodo`, `checkTodo`, `deleteTodo`) are fully covered above: their missing-todo status/body guarantees (HTTP 400 TypeError, HTTP 400 TypeError, HTTP 200 null) and their cross-user/cross-board `_id`-only mutation capability are removed. No other handler in this file (`createTodo`, `getTodos`, comment handlers) is touched by this change, so no further removals exist in this file.
- `server/src/routers/boardRouter.js`: Only the three mutation route registrations (lines 18, 20, 22) are renamed internally to `/:boardId/todo/:todoId`; the comment routes (lines 24, 26, 28) retain `/:id/todo/:id` and their handlers still read `req.params.id`, so nothing in those routes or handlers is removed. No other code in this file is removed by this change.

## Risk note

Highest-risk preserved behavior: the identical successful response payload for an authorized owner. `updateTodo` and `checkTodo` write via `findByIdAndUpdate`/`todo.save()` then re-fetch with `Todo.findById({ _id })`; any reimplementation of the lookup must return the same document fields. A secondary, caller-visible risk is the status-code/body change for missing/not-found todos: `deleteTodo` currently returns HTTP 200 `null` and `updateTodo`/`checkTodo` return HTTP 400 with a TypeError message; both become HTTP 404. Clients depending on those specific codes/bodies will break.

One concrete proof-test idea: call `PATCH /api/board/:boardId/todo/:todoId` with a valid JWT as the todo's owner and assert HTTP 200 with the same todo payload as before; then repeat with a different authenticated user's JWT (or the same user against a todo whose `boardId` differs from the URL) and assert HTTP 404 with a non-enumerating message.