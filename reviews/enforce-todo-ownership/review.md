## Lens 1 — Behaviour preservation: no finding.

## Lens 2 — Hidden assumptions

**Finding 1 — MINOR: Malformed ObjectId produces HTTP 400 instead of 404**

- Location: `server/src/services/todoServices.js:45`
- `Todo.findOneAndUpdate` can throw a Mongoose `CastError` when `todoId` or `boardId` has an invalid ObjectId format.
- The error is passed to the global error handler, which currently responds with HTTP 400.
- This is a malformed-input edge case, not a confirmed violation of the delta's 404 contract for missing, non-owned, or wrong-board todos.
- Consider explicit ObjectId validation or targeted CastError handling if uniform 404 behaviour for malformed IDs is required.

**Rejected candidate — unguarded `req.user.userId`**

- No finding. `authMiddleware` is mounted before `boardRouter` in `server/index.js:40`.
- Adding a second authentication guard inside this handler would duplicate middleware responsibility.

**Other checks — no finding**

- `name` absent/undefined/null/empty handling is unchanged.
- Database errors follow the existing global error-handling path.
- Re-fetch by `_id` follows a successful ownership-scoped update.
- `todo.save()` is a pre-existing pattern and is not a T1 regression.

**Evidence limitations:** Static review only. No tests or runtime database verification performed.

## Lens 3 — Spec / ADR drift

**No findings.**

- T1 route parameter disambiguation matches the delta.
- `updateTodo` applies the required `_id`, `userId`, and `boardId` filter.
- Missing, non-owned, and wrong-board todos return HTTP 404 with `{ message: "Todo not found" }`.
- The authorized-owner success response path is statically assessed as preserved.
- No changes outside T1 scope were found.
- T2 (`checkTodo`) and T3 (`deleteTodo`) remain pending as expected; their absence is not a T1 defect.
- No contradiction between the T1 task scope, delta, plan, and implementation was identified.
- No separate `spec.md` exists; the delta was used as the primary change specification.

**Evidence limitations:** Static review only. No tests or runtime verification performed.

## Lens 4 — Independent tests check

**Finding 1 — MINOR: No executable test evidence for T1**

- K5.D.8 was blocked because the server has no test framework, test files, fixtures, or working test script.
- No independent runnable tests were created or executed.
- All five T1 behaviours remain unverified at runtime:
  - Authorized owner update and successful response.
  - Non-owner update rejection.
  - Wrong-board update rejection.
  - Missing Todo returns HTTP 404.
  - PATCH route correctly distinguishes board and Todo IDs.
- This is an evidence gap, not a demonstrated implementation defect. No test infrastructure was mandated for T1, and the limitation was documented in K5.D.8.
- No code changes are recommended solely to address this gap.

**Minimum future verification**

Once an approved server test harness is available:
- Use a dedicated test secret and isolated test database.
- Add integration tests for the five behaviours listed above.
- Verify route parameter handling through HTTP requests.
- Do not use production credentials or a production database.

**Evidence limitations:** No executable tests, runtime verification, or database connections were performed.

## Lens 5 — Edge cases

**No T1-specific findings.**

**Pre-existing observation — MINOR: Concurrent deletion between update and re-fetch can return HTTP 200 with a null body**

- Location: `server/src/services/todoServices.js:52-55`
- If another request deletes the Todo after `findOneAndUpdate` succeeds but before the subsequent `Todo.findById`, the re-fetch can return `null`.
- The handler can then respond with HTTP 200 and a `null` body.
- This pattern existed before T1; the re-fetch logic was not introduced by this change.
- It is not classified as a T1 regression.
- If addressed later, preserve the successful response contract. Returning the `findOneAndUpdate` result directly would require an option such as `{ new: true }` to return the updated document.

**Other edge cases — no finding**

- Missing route parameters do not match the PATCH route.
- Empty or malformed ObjectIds fall under Lens 2 Finding 1.
- Authentication middleware runs before the route handler.
- The new null guard correctly returns HTTP 404 when `findOneAndUpdate` returns `null`.
- `name` handling remains unchanged as required by the delta and plan.
- Board membership is enforced in the T1 PATCH handler.
- PUT/DELETE ownership checks remain T2/T3 scope, not T1 defects.
- Comment routes do not conflict with the PATCH route.

**Evidence limitations:** Static review only. No runtime concurrency or database tests performed.

## Lens 6 — Security / tool-call surface

**No findings.**

- Object-level authorization is enforced directly in the database query through `_id`, `userId`, and `boardId`.
- A user cannot update another user's Todo or a Todo belonging to another board through the T1 PATCH handler.
- The PATCH route uses distinct `boardId` and `todoId` parameters.
- The handler obtains `boardId` from the route and does not trust a request-body field for board ownership.
- The MongoDB filter structure and update operator are hardcoded; request values do not control query operators or update field names.
- Authentication middleware remains mounted before the board router.
- Missing, non-owned, and wrong-board Todo cases return the same HTTP 404 response.
- The change closes the previous object-level authorization gap and associated disclosure of non-owned Todo data.
- The post-update re-fetch does not introduce a new authorization bypass.
- PUT/DELETE ownership gaps remain T2/T3 scope and are not T1 findings.

**Evidence limitations:** Static security review only. No penetration tests, runtime tests, or database verification performed.

## Lens 7 — Over-engineering

**No findings.**

- T1 introduces no unnecessary abstractions, helpers, middleware, or configuration.
- The route parameter rename, ownership-scoped database filter, and 404 null guard are all required by the delta.
- No new redundant database operations were introduced.
- The existing `todo.save()` and post-update re-fetch patterns predate T1 and are not T1 over-engineering findings.
- No duplicate authorization checks or unrelated source changes were found.
- The implementation complexity is proportionate to the security improvement.

**Evidence limitations:** Static review only. No runtime or performance measurements performed.

# Seven-Lens Code Review — enforce-todo-ownership

## Final verdict: HOLD

**Scope:** T1 — PATCH route parameter disambiguation and `updateTodo` ownership enforcement.

**Review result:** No blocker or major findings. The T1 implementation is statically consistent with the delta and introduces the intended object-level authorization using `_id`, `userId`, and `boardId` in the database query.

### Reasons for HOLD

1. No independent executable tests or runtime verification are available. K5.D.8 was blocked because the server repository has no test harness.
2. The review therefore cannot establish runtime correctness for the authorized-owner, non-owner, wrong-board, missing-Todo, and route-parameter scenarios.

### Findings summary

- **MINOR — Lens 2:** Malformed ObjectId values can produce HTTP 400 through the existing CastError handling path. This is not a confirmed violation of the specified 404 contract for missing, non-owned, or wrong-board todos.
- **MINOR — Lens 4:** No executable independent test evidence exists for T1.
- **Pre-existing observation — Lens 5:** Concurrent deletion between update and re-fetch can result in HTTP 200 with a null response body. This behaviour predates T1 and is not a T1 regression.
- Lenses 1, 3, 6, and 7 have no findings.

### Required actions before changing the verdict

- Obtain appropriate runtime verification when an approved test harness becomes available.
- Do not install dependencies, introduce a test framework, or connect to a database without explicit approval.
- Reassess the verdict after verification evidence is available.

### Out-of-scope items

T2 (`checkTodo`) and T3 (`deleteTodo`) remain pending. Their implementation is not part of this T1 verdict.

### Evidence limitations

The review was static. No application startup, database connection, executable tests, or penetration tests were performed.

## Adversarial pass

This section documents a K 5.D.10 adversarial review of the T1 implementation on branch `kata/k-5-d-7-t1-enforce-todo-ownership`.

### Model and evidence disclosure

- Model used: GPT-6.
- Review type: cross-model adversarial review.
- Isolation: not Tier A or fully context-isolated; this review used the supplied evidence package and prior task context.
- No source code changes were made during this adversarial pass.
- No tests, application startup, or database operations were performed.
- Neither adversarial finding was runtime-tested.

### 1. Pre-mortem finding — Todo name validation

**Classification:** Confirmed pre-existing schema validation gap, not a T1 regression.

- **Location:** `server/src/models/Todo.js:7`
- The schema uses `require: true` instead of Mongoose's `required: true`.
- This means the intended required-field validation is not configured correctly.
- **Trigger:** An authorized PATCH request with `{ "name": null }` or an empty name.
- **Blast radius:** Invalid Todo names may be persisted.
- **Mitigation:** Correct the schema option and add explicit request validation in a separate validation change.
- **Resolution:** Accept with documented risk.
- **Reason:** Name validation was not part of the T1 delta. Address it through a separately scoped change after agreeing on the API validation contract.

### 2. Edge-case finding — JSON null request body

**Classification:** Pre-existing input-handling limitation, not a T1 regression.

- **Location:** `server/src/services/todoServices.js:42`
- The handler destructures `name` from `req.body`.
- **Trigger:** A PATCH request with JSON body `null`.
- **Observable failure:** Destructuring `null` throws a TypeError before the database query; the error follows the existing error-handling path.
- **Mitigation:** Validate that the request body is a non-null object and return a controlled HTTP 400 response.
- **Resolution:** Accept with documented risk.
- **Reason:** Explicit request-body validation is outside the current T1 delta. Record it for a separately scoped API validation improvement.

### Verdict update

**Final verdict: HOLD — unchanged.**

**Reason:** The implementation still lacks executable test and runtime verification. The two adversarial findings are documented risks accepted for this Kata; neither requires a T1 source change. T2 (`checkTodo`) and T3 (`deleteTodo`) remain pending and are out of scope for this T1 verdict.