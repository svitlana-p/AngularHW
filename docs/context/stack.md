# Stack Reference — AngularHW (warm layer)

## Languages
- TypeScript (client) — client/package.json devDependency typescript ~4.7.2
- JavaScript (server) — server/index.js is plain CommonJS

## Frameworks and versions
- Angular 14 — client/package.json: @angular/* ^14.0.0, @angular/cli ~14.2.1
- RxJS ~7.5.0 — client/package.json:23
- Express 4 — server/package.json:19 express ^4.17.1
- Mongoose 6 — server/package.json:21 mongoose ^6.5.2
- bcryptjs ^2.4.3 — server/package.json:15
- jsonwebtoken ^8.5.1 — server/package.json:20

## Build tools
- Angular CLI 14.2.1 — client/package.json:28
- Client scripts: ng serve --proxy-config proxy.config.json, ng build, ng test (client/package.json:4-9)
- Server scripts: node index.js, nodemon index.js, eslint (server/package.json:7-10)

## Test runners
- Client: Karma 6 + Jasmine 4 — client/package.json:32-35, karma.conf.js:7-13
- Client specs: *.spec.ts — 24 files under client/src/app/
- Server: no test suite — server/package.json:10 exits 1

## Application structure and entry points
- Client entry: client/src/main.ts:1 -> AppModule (client/src/app/app.module.ts:1)
- Client routes: client/src/app/app-routing.module.ts:5-11 (lazy feature modules)
- Client API services: client/src/app/core/services/*.ts (auth, dashboard, todo)
- Server entry: server/index.js:1
- Server routes mounted: server/index.js:38-40 (/api/auth, /api/dashboard, /api/board)
- Server handlers: server/src/services/*.js
- Server models: server/src/models/*.js (Users, Boards, Todo, Comment)

## Relevant commands (confirmed from package scripts)
- Client dev: ng serve --proxy-config proxy.config.json
- Client test: ng test
- Server start: node index.js
- Server lint: eslint . --ext .js

## Architectural constraint (static code finding)
Backend enforces JWT authentication via authMiddleware on /api/dashboard and /api/board routes (server/index.js:39-40), but performs inconsistent object-level authorization. List endpoints getBoards (server/src/services/boardServices.js:26) and getTodos (server/src/services/todoServices.js:30) filter by userId. Several individual board, todo, and comment operations locate resources by _id or todoId without verifying ownership or parent-child relationships. Comment ownership is not checked directly through a userId field — the Comment model (server/src/models/Comment.js:5-12) has no userId field. Creation of todos does not verify that the referenced board belongs to the authenticated user (server/src/services/todoServices.js:4-24). This is a static code finding, not a runtime exploit test.