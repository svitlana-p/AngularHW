PR Title: Enforce Todo ownership on PATCH route with board-scoped parameter disambiguation

### What changed

T1 of the enforce-todo-ownership change renames the PATCH route parameters
from `/:id/todo/:id` to `/:boardId/todo/:todoId` in `boardRouter.js`, and
updates `updateTodo` in `todoServices.js` to read `boardId`, `todoId`, and
`req.user.userId` from the request, then look up the Todo using the compound
filter `{ _id: todoId, userId, boardId }` via `Todo.findOneAndUpdate`. If no
matching Todo is found (missing, owned by another user, or belonging to a
different board), the handler returns HTTP 404 `{ message: "Todo not found" }`.
The existing successful response payload for authorized owners is preserved,
including the `todo.save()` and `Todo.findById({ _id: todoId })` re-fetch
pattern.

### Why the change was needed

Previously, `updateTodo` located the Todo by `_id` only (`req.params.id`), with
the board segment of the URL never read and `req.user.userId` never consulted.
This meant any authenticated user could update any Todo by its `_id`, and the
board segment in the URL was ignored — a cross-user and cross-board
authorization gap. T1 closes this gap for the PATCH endpoint.

### Security/authorization behaviour addressed

Object-level authorization is now enforced directly in the database query
through `_id`, `userId`, and `boardId`. A user cannot update another user's
Todo or a Todo belonging to another board through the T1 PATCH handler. Missing,
non-owned, and wrong-board Todo cases return the same HTTP 404 response, avoiding
resource enumeration. PUT (`checkTodo`) and DELETE (`deleteTodo`) endpoints are
unchanged and remain pending ownership enforcement as T2 and T3 respectively.

### Provenance

| Field | Value |
|-------|-------|
| Tool / client | CodeMie Claude Desktop |
| Model name and version | not recorded |
| Date | 11/19/2026 (from artefact timestamps); exact session time not recorded |
| Context loaded | Hot: `AGENTS.md` (committed blob SHA `2813bc25d4e9c26cc8af6f92d5de908c03aca151`; working-tree hash matches, so working tree equals committed version). Warm: `docs/context/stack.md`, `context/cold/README.md`, `context/cold/gap-log.md`. Skills: `skills/review-code-change/SKILL.md`. Delta: `changes/enforce-todo-ownership/delta.md`. Plan/tasks: `changes/enforce-todo-ownership/plan.md`, `changes/enforce-todo-ownership/tasks.md`. |
| Verification gates | `git diff --check`: PASS (exit 0). Linter: NOT RECORDED. Type check: NOT RECORDED. Automated tests: NOT RECORDED. Independent tests (K 5.D.8): BLOCKED — no server test harness. K 5.D.3 CI guard: NOT RECORDED. Runtime/API verification: NOT RECORDED. Database verification: NOT RECORDED. |
| Human decisions | The human explicitly required: no test framework or dependency installation without approval; no application startup; no external database/service connections; no commits or pushes without explicit approval. These constraints directly determined the verification approach: no automated tests, no linter, no type check, no runtime/API verification, and no database verification could be performed, because each would require either installing dependencies, starting the application, or connecting to MongoDB — all prohibited without explicit approval. |
| Known limitations | No executable independent test evidence exists for T1 (K 5.D.8 blocked). Runtime verification remains outstanding. K 5.D.9 Seven-Lens review verdict: HOLD. K 5.D.10 adversarial pass did not change the verdict. T2 (`checkTodo` ownership enforcement) and T3 (`deleteTodo` ownership enforcement) are pending. Two documented risks accepted: (1) Todo schema uses `require: true` instead of `required: true` (`server/src/models/Todo.js:7`); (2) JSON null request body causes TypeError at destructuring (`server/src/services/todoServices.js:42`). |

### Linked evidence

| # | Artefact | Repository-relative link | Exists |
|---|----------|-------------------------|--------|
| 1 | Delta/spec | `changes/enforce-todo-ownership/delta.md` | Yes |
| 2 | Plan | `changes/enforce-todo-ownership/plan.md` | Yes |
| 3 | Tasks | `changes/enforce-todo-ownership/tasks.md` | Yes |
| 4 | T1 session log | `sessions/T1/session-log.md` | Yes |
| 5 | T1 checkpoint | `sessions/T1/checkpoint-15m.md` | Yes |
| 6 | Seven-Lens review + Adversarial pass | `reviews/enforce-todo-ownership/review.md` | Yes |
| 7 | K 5.D.3 CI guard documentation | `docs/ci.md` | Yes |
| 8 | K 5.D.3 CI workflow | `.github/workflows/test-file-deletion-guard.yml` | Yes |

Total linked artefacts: 8

Independent tests: No executable independent server test file exists from K 5.D.8. The K 5.D.8 blocker is documented in `reviews/enforce-todo-ownership/review.md` Lens 4. Runtime verification remains outstanding.

### Verification summary

| Gate | Status | Evidence |
|------|--------|----------|
| `git diff --check` | PASS | session-log.md: exit code 0; checkpoint-15m.md: no whitespace errors |
| Linter | NOT RECORDED | No evidence of execution |
| Type check | NOT RECORDED | No evidence of execution |
| Automated tests | NOT RECORDED | No evidence of execution |
| Independent tests (K 5.D.8) | BLOCKED | No server test framework; `npm test` exits 1 |
| K 5.D.3 CI guard | NOT RECORDED | Not executed locally |
| Runtime/API verification | NOT RECORDED | Not performed |
| Database verification | NOT RECORDED | Not performed |

Total: 1 PASS, 1 BLOCKED, 6 NOT RECORDED.
| Session duration | not recorded |
| SDD approach | Delta at `changes/enforce-todo-ownership/delta.md` drove implementation; plan/tasks decomposed work into T1–T4 with T1 first. |

### Known limitations

- No executable independent test evidence exists for T1 (K 5.D.8 blocked because no server test harness exists).
- Runtime verification remains outstanding.
- K 5.D.9 Seven-Lens review verdict: HOLD.
- K 5.D.10 adversarial pass did not change the verdict.
- T2 (`checkTodo`) and T3 (`deleteTodo`) remain pending.
- Two documented risks accepted: (1) Todo schema uses `require: true` instead of `required: true` (`server/src/models/Todo.js:7`); (2) JSON null request body causes TypeError at destructuring (`server/src/services/todoServices.js:42`).

**This change is NOT described as merge-ready.** The HOLD verdict and lack of runtime verification mean a human reviewer must decide whether to proceed pending T2/T3 implementation and test infrastructure.

### Redaction report

All 8 linked artefacts were scanned for secrets, credentials, customer data, internal URLs, hostnames, employee names, and proprietary domain terms. `.env` and `server/requestLogs.log` were not inspected, per constraints. No secret values are printed in this document.

| # | Artefact | Redaction status |
|---|----------|------------------|
| 1 | `changes/enforce-todo-ownership/delta.md` | PASS |
| 2 | `changes/enforce-todo-ownership/plan.md` | PASS |
| 3 | `changes/enforce-todo-ownership/tasks.md` | PASS |
| 4 | `sessions/T1/session-log.md` | PASS |
| 5 | `sessions/T1/checkpoint-15m.md` | PASS |
| 6 | `reviews/enforce-todo-ownership/review.md` | PASS |
| 7 | `docs/ci.md` | PASS |
| 8 | `.github/workflows/test-file-deletion-guard.yml` | PASS |

All artefacts are safe to link. None is marked NOT SAFE TO LINK. The entire repository was not scanned — only the 8 linked artefacts listed above.

### Read-as-a-stranger verdict

**FAIL** — Evidence is sufficient to understand the change and its risks, but insufficient to recommend merge because runtime verification is missing and T2/T3 are unimplemented.

Missing evidence:
- Runtime/API verification results
- Database verification results
- Independent executable test results (blocked by absence of server test harness)
- T2 and T3 implementation

---

Files created during this session: `changes/enforce-todo-ownership/pr-description.md` (this file).

No source files or prior Kata artefacts were modified during this session. No commits, pushes, or remote PR actions were performed.