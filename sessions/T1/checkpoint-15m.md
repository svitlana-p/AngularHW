# T1 Checkpoint — 15-minute mark

## Done
T1 implemented and statically verified on branch `kata/k-5-d-7-t1-enforce-todo-ownership`. Two files modified:

- `server/src/routers/boardRouter.js:18` — PATCH route renamed from `/:id/todo/:id` to `/:boardId/todo/:todoId`.
- `server/src/services/todoServices.js:40–56` — `updateTodo` now reads `boardId`/`todoId` from `req.params`, reads `userId` from `req.user.userId`, uses `Todo.findOneAndUpdate({ _id: todoId, userId, boardId }, { $set: { name } })`, returns `404 { message: "Todo not found" }` when no match is found, and preserves `todo.save()`, re-fetch via `Todo.findById({ _id: todoId })`, and `res.json(todo)` success payload.

PUT (`router.put`) and DELETE (`router.delete`) routes/handlers untouched; comment routes untouched. `git status --short` shows exactly these two files modified. `git diff --check` exit code 0 (no whitespace errors). Verification is static review of the applied diff only — no application run, no MongoDB connection, no tests executed.

## Stuck
None.

## Discovered
Mongoose 6 (`mongoose ^6.5.2`, confirmed in `server/package.json:21`) `findByIdAndUpdate(id, update, options)` treats its first argument as the `_id` value, not a filter object, so it cannot correctly apply a compound `{ _id, userId, boardId }` filter. `findOneAndUpdate(filter, update, options)` accepts a full query filter and was required for the ownership + board-membership lookup.

## Rejected
`Todo.findByIdAndUpdate({ _id: todoId, userId, boardId }, { $set: { name } })` — rejected because `findByIdAndUpdate` interprets its first argument as the document `_id`, not a query filter, so passing a compound object would not enforce `userId`/`boardId` ownership and board membership. Selected `Todo.findOneAndUpdate({ _id: todoId, userId, boardId }, { $set: { name } })` instead, which correctly accepts the compound filter and returns `null` on no match for the explicit HTTP 404 check.