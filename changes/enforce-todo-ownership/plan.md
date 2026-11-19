# Change ID: enforce-todo-ownership — Implementation Plan

Source contract: `changes/enforce-todo-ownership/delta.md`

## Component 1 — Route parameter disambiguation

**Responsibility:** Rename the three mutation route paths so the board segment and the todo segment are distinct parameter names, making `boardId` and `todoId` separately available in `req.params`. The externally visible URL shape is unchanged (`/api/board/:boardId/todo/:todoId`); comment routes are left untouched.

**Files likely to change:** `server/src/routers/boardRouter.js` (lines 18, 20, 22).

**Inputs:** Current Express registrations `router.patch("/:id/todo/:id", ...)`, `router.put("/:id/todo/:id", ...)`, `router.delete("/:id/todo/:id", ...)`.

**Outputs:** Registrations `router.patch("/:boardId/todo/:todoId", ...)`, `router.put("/:boardId/todo/:todoId", ...)`, `router.delete("/:boardId/todo/:todoId", ...)`. Comment routes (`/:id/todo/:id/comments*`) keep their existing `:id` naming and still read `req.params.id`.

**Dependencies:** Express Router only.

**Interface/seam to Components 3–5:** "The router exposes `req.params.boardId` and `req.params.todoId` (replacing the single shadowed `req.params.id`), which the handlers read as the board-membership value and the Todo resource identifier respectively."

## Component 2 — Uniform 404 not-found/forbidden contract

**Responsibility:** Define the single HTTP 404 response shape returned by all three mutation handlers when a Todo is missing, owned by another user, or belongs to a different board than the URL. This avoids resource enumeration by making all three cases indistinguishable.

**Files likely to change:** `server/src/services/todoServices.js` (shared contract, no separate file).

**Inputs:** None (constant response).

**Outputs:** `res.status(404).json({ message: "Todo not found" })` — identical status, shape, and message for missing / non-owned / wrong-board.

**Dependencies:** Express `res` object only.

**Interface/seam to Components 3–5:** "Each handler, when its ownership-scoped Mongoose lookup returns `null`, invokes this contract: `res.status(404).json({ message: \"Todo not found\" })` instead of propagating `null` to a save/field-access or returning `res.json(null)`."

## Component 3 — updateTodo ownership enforcement

**Responsibility:** Add `userId` and `boardId` conditions to the `findByIdAndUpdate` filter so the update only matches a Todo owned by the authenticated user on the board in the URL. Return HTTP 404 when no match is found instead of letting `null.save()` throw a TypeError. Preserve the existing success payload for an authorized owner; preserve the absent/undefined `name` handling (passes `$set: { name: undefined }` unchanged).

**Files likely to change:** `server/src/services/todoServices.js` (`updateTodo`, lines 40–54).

**Inputs:** `req.params.boardId`, `req.params.todoId`, `req.user.userId`, `req.body.name`.

**Outputs:** For an authorized owner — existing `res.json(todo)` payload (the re-fetched document). For missing / non-owned / wrong-board — HTTP 404 `{ message: "Todo not found" }`.

**Dependencies:** `Todo` model (`server/src/models/Todo.js`); Component 1 (`req.params.boardId`/`todoId`); Component 2 (404 contract).

**Interface/seam from Component 1 / to Component 2:** "Reads `req.params.boardId` and `req.params.todoId` supplied by Component 1; on `null` lookup result invokes the Component 2 404 contract."

## Component 4 — checkTodo ownership enforcement

**Responsibility:** Add `userId` and `boardId` conditions to the `findById` lookup so the toggle only applies to a Todo owned by the authenticated user on the board in the URL. Return HTTP 404 when no match is found instead of letting field access on `null` throw a TypeError. Preserve the existing success payload; preserve the `action` switch behavior exactly, including the `default` branch setting `created=true` for missing/invalid/unknown action values.

**Files likely to change:** `server/src/services/todoServices.js` (`checkTodo`, lines 56–95).

**Inputs:** `req.params.boardId`, `req.params.todoId`, `req.user.userId`, `req.body.action`.

**Outputs:** For an authorized owner — existing `res.json(todo)` payload (the re-fetched document). For missing / non-owned / wrong-board — HTTP 404 `{ message: "Todo not found" }`. Default branch unchanged: `created=true`, `inProgress=false`, `completed=false`.

**Dependencies:** `Todo` model; Component 1; Component 2.

**Interface/seam from Component 1 / to Component 2:** "Reads `req.params.boardId` and `req.params.todoId` supplied by Component 1; on `null` lookup result invokes the Component 2 404 contract before any field mutation."

## Component 5 — deleteTodo ownership enforcement

**Responsibility:** Add `userId` and `boardId` conditions to the `findByIdAndDelete` filter so deletion only applies to a Todo owned by the authenticated user on the board in the URL. Return HTTP 404 when no match is found instead of `res.json(null)` with HTTP 200. Preserve the existing deleted-document payload for an authorized owner.

**Files likely to change:** `server/src/services/todoServices.js` (`deleteTodo`, lines 97–105).

**Inputs:** `req.params.boardId`, `req.params.todoId`, `req.user.userId`.

**Outputs:** For an authorized owner — existing `res.json(todo)` payload (the deleted document). For missing / non-owned / wrong-board — HTTP 404 `{ message: "Todo not found" }`.

**Dependencies:** `Todo` model; Component 1; Component 2.


## Component 6 — Verification approach (no server test suite)

**Responsibility:** Define the smallest realistic verification given there is currently no server test suite and no test framework installed. Do not assume a framework or add dependencies.

**Files likely to change:** None (verification procedure only; no source change).

**Inputs:** The implemented handlers from Components 3–5.

**Outputs:** A verification checklist covering: (a) owner JWT → HTTP 200 with existing payload for PATCH/PUT/DELETE; (b) non-owner JWT → HTTP 404; (c) wrong-board URL → HTTP 404; (d) missing todo → HTTP 404; (e) `checkTodo` default action still sets `created=true`; (f) `updateTodo` with absent `name` still proceeds. Plus an explicit decision on whether to introduce a test framework (e.g., Jest/Mocha) or verify manually via a standalone script/curl against a local instance.

**Dependencies:** A runnable local server instance (MongoDB access required); no npm dependencies added.

**Interface/seam from Components 3–5:** "Verification exercises the same `req.params.boardId`/`req.params.todoId` seam and the Component 2 404 contract through the real route handlers."

## Dependencies and ordering

1. Component 1 must precede Components 3–5 (handlers depend on `req.params.boardId`/`todoId`).
2. Component 2 defines the 404 contract used by Components 3–5; it can be implemented inline with Component 3 but must be consistent across all three.
3. Components 3, 4, and 5 are independent of one another once Components 1 and 2 are in place.
4. Component 6 is last (verification after implementation).

## Decomposition guidance

This plan is specific enough to decompose into 4–8 tasks, each with a diff under 100 lines:
- Task A: Component 1 route renaming (< 10 lines).
- Task B: Component 3 updateTodo change (< 30 lines).
- Task C: Component 4 checkTodo change (< 40 lines).
- Task D: Component 5 deleteTodo change (< 20 lines).
- Task E: Component 6 verification procedure and test-framework decision (documentation only).

Scope is deliberately limited to the three mutation handlers and their route registrations; `getTodos`, board mutations, authentication, the global error handler, and comment handlers are not touched.