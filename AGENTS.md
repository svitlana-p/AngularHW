# Agent Context — AngularHW (hot layer)

This is a read-only repository by default. Every session starts here.

SAFETY BOUNDARIES (default mode = read-only reconnaissance):
- Do not create, edit, delete, or commit files unless explicitly asked.
- Do not run npm install, npm update, builds, tests, or application servers.
- Do not connect to MongoDB Atlas, Render, or any external service.
- Do not read, print, copy, or expose server/.env or any credential/token/secret.
- Do not inspect server/requestLogs.log.

HOW TO WORK HERE:
- Treat this repo as exploration-only. Inspect source, manifests, config, and Git-tracked filenames.
- Verify every assumption against code before stating it as fact.
- If information is missing (deployment history, incident context, env ownership), say it is unknown — do not invent it.

ENTRY POINTS:
- Client: client/src/main.ts -> AppModule -> AppRoutingModule (port 4200)
- Server: server/index.js (port 8080; Mongoose connects to MongoDB Atlas)

WARM AND COLD CONTEXT:
- Stack and version facts: docs/context/stack.md
- Honest knowledge gaps: context/cold/gap-log.md

RULES FOR CODE CHANGES:
- Client tests: ng test (Karma/Jasmine), specs end in *.spec.ts
- Server has no test suite; its test script exits 1
- server/.env is tracked in git — treat all values as exposed

If you need to modify anything, request explicit user permission first.

## Repository-specific code review context

These facts apply to this repository only and are not universal code-review instructions:
- The client is Angular 14 with TypeScript.
- Client tests use Karma and Jasmine.
- The server uses Express and JavaScript.
- No server test suite is currently configured.
- The client and server have different test capabilities; do not assume that a client test command validates server behavior.
- Check the actual package scripts before choosing a verification command.