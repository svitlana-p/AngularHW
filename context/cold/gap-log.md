# Cold Gap Log — AngularHW

## Gap 1: server/.env committed to git

- description: server/.env is tracked in Git (first added in commit 06b0150, "add server side and auth in client side"). No server/.gitignore exists, so the server directory has no ignore rules. Whether any historical credentials were ever active, or who owns them, cannot be determined without inspecting the file contents (forbidden).
- discovery_event: git ls-files listed server/.env; git log --all -- server/.env returned commit 06b0150
- refresh_trigger: Before any local server run or any commit touching server/

## Gap 2: Hardcoded Render API URLs in client services

- description: Client API services hardcode https://dashboard-0y2w.onrender.com/api/... as the base URL instead of using an environment-variable-driven API URL. Whether this was a deliberate deployment choice or an oversight cannot be determined from the repository.
- discovery_event: Read client/src/app/core/services/auth.service.ts:14, dashboard.service.ts:16, todo.service.ts:16
- refresh_trigger: If the Render deployment URL changes, or before a production build

## Gap 3: Server error-handling approach

- description: The server error handler (server/index.js:54-58) returns HTTP 400 for every error, with console.error commented out. The historical reason for this approach — whether intentional, a debugging remnant, or inherited from a template — is not documented in the repository.
- discovery_event: Read server/index.js:54-58
- refresh_trigger: Before changing error handling or adding server observability