# Paginated and Rate-Limited Todo API — Specification

## 1. Behaviour

### Existing behaviour (current codebase)

- `GET /api/board/:id` is handled by `getTodos` in `server/src/services/todoServices.js:26–38`.
- `getTodos` calls `Todo.find({ userId: req.user.userId, boardId: boardId }, "-__v")` and returns all matching documents with no pagination, no limit, no skip, and no count.
- `Todo` model (`server/src/models/Todo.js`) has boolean fields `created`, `inProgress`, `completed`, `archive` and timestamps via `{ timestamps: true }`.
- `authMiddleware` (`server/src/middleware/authMiddleware.js:3–30`) runs before todo routes (`server/index.js:40`) and sets `req.user = { userId, username }`.
- Individual todo mutation routes (`updateTodo`, `checkTodo`, `deleteTodo`) locate resources by `_id` only and do not verify board ownership or that the todo belongs to the requesting user.

### New behaviour

#### GET /api/board/:id — paginated todo list with optional status filter

Query parameters:
- `page`: optional, positive integer, default 1.
- `limit`: optional, integer from 1 to 50 inclusive, default 10.
- `status`: optional; allowed values `created`, `inProgress`, `completed`, `archived`.

Mapping of `status` values to Todo boolean fields:
- `created` → `created: true`
- `inProgress` → `inProgress: true`
- `completed` → `completed: true`
- `archived` → `archive: true`

When `status` is provided, the Mongoose query adds the corresponding boolean condition set to `true`. Only one status filter may be applied at a time.

Board ownership verification:
- Before querying todos, the handler must verify that a board with `_id = req.params.id` exists and that its `userId` equals `req.user.userId`.
- If no such board exists, or the board exists but belongs to another user, the response is HTTP 404. The same status code is used for both cases to avoid revealing whether another user's board exists.

Deterministic ordering:
- Results are sorted by `createdAt` ascending, then `_id` ascending, so records do not unpredictably move between pages when `createdAt` values are equal.

Response shape (HTTP 200):
```json
{
  "todos": [ ... ],
  "total": <integer>,
  "page": <integer>,
  "limit": <integer>,
  "pages": <integer>
}
```
- `todos`: array of Todo documents for the requested page.
- `total`: total count of todos matching the userId, boardId, and optional status filter.
- `page`: the requested page number (echoed back).
- `limit`: the requested page size (echoed back).
- `pages`: `Math.ceil(total / limit)`; `0` when `total` is `0`.

Empty result:
- When no todos match, HTTP 200 is returned with `"todos": []`, `"total": 0`, `"pages": 0`.

Invalid parameters:
- `page` not a positive integer → HTTP 400.
- `limit` not an integer in [1, 50] → HTTP 400.
- `status` not one of the allowed values → HTTP 400.

#### Mutation endpoints — per-user rate limiting

Mutation endpoints under `/api/board/:id/todo/:id` (`updateTodo`, `checkTodo`, `deleteTodo`) and `/api/board/:id` (`createTodo`) are rate-limited per authenticated user.

- Limit: 60 mutation requests per authenticated user per 60-second sliding window.
- Identifier: `req.user.userId` (set by `authMiddleware`).
- `authMiddleware` must run before rate-limiting middleware so `req.user.userId` is available.
- Rate limit exceeded → HTTP 429 with a `Retry-After` header indicating seconds until the window resets.
- Implementation note for MVP: an in-memory store is used. Limits are per server process and are not globally consistent across multiple instances. No Redis or distributed store exists.

### Out of scope

- Angular UI changes.
- Comment pagination.
- Board list (`GET /api/dashboard`) pagination.
- New server test infrastructure.

## 2. Concurrency

- Pagination `countDocuments` and `find` queries are separate operations. Concurrent database inserts, updates, or deletes between the count and the find may cause a todo to appear on two pages, disappear from all pages, or shift position. Snapshot consistency is **not** promised.
- Concurrent requests with different `page`, `limit`, or `status` parameters must not share or overwrite one another's request parameters. Each request's query parameters are scoped to that request's handler invocation.
- Concurrent mutation requests from the same user each increment the rate-limit counter independently. Race conditions in the in-memory counter may allow slightly more than 60 requests in a window under high concurrency; this is an accepted MVP trade-off.
- The `createdAt` + `_id` deterministic sort ensures stable ordering for pagination, but concurrent updates to `createdAt` (e.g., via document replacement) are not expected in normal operation.

## 3. Errors

### Response error shape (all errors)

```json
{
  "message": "<string>"
}
```

### Error cases

| Condition | HTTP status | Message example |
|-----------|-------------|-----------------|
| `page` missing or not a positive integer | 400 | "Invalid page parameter" |
| `limit` missing or not an integer in [1, 50] | 400 | "Invalid limit parameter" |
| `status` not one of allowed values | 400 | "Invalid status parameter" |
| Board not found or not owned by requesting user | 404 | "Board not found" |
| Rate limit exceeded | 429 | "Too many requests" (with `Retry-After` header) |
| Missing or invalid authentication | 401 | Existing authMiddleware behaviour |
| MongoDB connection/query failure | 500 | "Internal server error" |

### Authentication errors

- `authMiddleware` runs first and returns HTTP 401 for missing or invalid JWT. Rate limiting is not evaluated when authentication fails.

### Database failures

- If MongoDB is unreachable or a query fails, the existing Express error handler (`server/index.js:54–58`) returns HTTP 400 with `err.message`. This behaviour is preserved; no new 500 handling is introduced by this spec.

## 4. Boundaries

- Minimum `page`: 1.
- Maximum `limit`: 50. Requests for `limit > 50` receive HTTP 400.
- Minimum `limit`: 1. Requests for `limit < 1` receive HTTP 400.
- `page` beyond the last page: returns HTTP 200 with `"todos": []`, `"total": <actual>`, `"pages": <computed>`. No error is raised for an empty page.
- `status` unknown value: HTTP 400.
- `status` omitted: no status filter is applied; all todos for the board are paginated.
- Board exists but belongs to another user: HTTP 404 (indistinguishable from unknown board).
- Rate limit window: 60 seconds, sliding.
- Rate limit threshold: 60 mutation requests per user per window.
- Rate limit header: `Retry-After` set to seconds remaining in the window when limit is exceeded.
- In-memory rate-limit store: limits reset when the server process restarts; not shared across instances.

## 5. Integrations

### MongoDB (Mongoose)

- Integration point: `Todo` model (`server/src/models/Todo.js`) and `Board` model (`server/src/models/Boards.js`).
- The handler queries `Board` to verify ownership, then queries `Todo` with `limit`/`skip` for the page and `countDocuments` for the total.
- Failure mode: if MongoDB is unavailable, Mongoose throws; the existing Express error handler returns HTTP 400. No retry circuit is introduced.
- Assumption: the `createdAt` field exists on `Todo` documents (set by `{ timestamps: true }`) and is indexed sufficiently for sort + limit queries. Index existence is not verified statically.

### JWT authentication middleware

- Integration point: `server/src/middleware/authMiddleware.js`.
- `authMiddleware` populates `req.user.userId` from the JWT payload.
- Rate-limiting middleware must be positioned after `authMiddleware` in the route chain.
- Failure mode: if `authMiddleware` rejects the token, rate limiting is never reached (HTTP 401 returned first).
- Assumption: JWT payload contains `userId`. If a future token omits `userId`, rate limiting falls back to a generic identifier (behaviour to be defined at implementation time; not specified here).

### Rate-limit store

- MVP uses an in-memory store keyed by `req.user.userId`.
- Limitation: limits are per server process. Multiple server instances do not share counters. A user could make 60 requests on each instance within a window. No distributed store (e.g., Redis) exists in the repository.

## 6. NFR budget

All targets are proposed MVP targets. Performance assumptions are unverified against production load.

| Metric | Target | Condition / note |
|--------|--------|------------------|
| Paginated todo list latency (p95) | < 200 ms | Warm MongoDB connection, board with ≤ 1,000 matching todos, `limit ≤ 50`, single server instance. Unverified against production load. |
| Maximum response payload size | < 500 KB | `todos` array at `limit = 50` with typical Todo document size. Unverified against production document sizes. |
| Rate-limit decision latency | < 5 ms | In-memory counter lookup, no I/O. |
| Error response consistency | 100% | All error responses use shape `{ "message": "<string>" }`. |
| Concurrency safety | No shared request state | Each request's pagination parameters are isolated to that request. |
| Complexity | No new dependencies | MVP uses in-memory rate limiting; no Redis or additional npm packages required.

## Acceptance criteria

Given a board owned by the authenticated user with 25 matching todos, when `GET /api/board/:id?page=1&limit=10` is called with a valid JWT, then the response is HTTP 200 with `todos.length === 10`, `total === 25`, `page === 1`, `limit === 10`, `pages === 3`.

Given a board that exists but belongs to a different user, when `GET /api/board/:id` is called with a valid JWT for the requesting user, then the response is HTTP 404.

Given 60 mutation requests from the same authenticated user within a 60-second window, when the 61st mutation request is made, then the response is HTTP 429 with a `Retry-After` header.

Given `GET /api/board/:id?status=invalid`, when the request is made with a valid JWT, then the response is HTTP 400.