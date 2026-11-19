# CI — Test File Deletion Guard

## Gate overview

This repository enforces a test-file deletion guard on pull requests targeting `main`. A PR must not delete a test file (`*.spec.*` or `*.test.*`) unless at least one commit message in the PR contains the marker `DELETE_TESTS: <reason>`, where `<reason>` is non-whitespace text after the colon. The gate is implemented as a GitHub Actions workflow that runs a shell script comparing the PR base and head revisions, detecting deleted test files via `git diff`, and scanning PR commit messages for the marker.

Server-side enforcement matters because AI-assisted PRs can delete test files without the author realizing the impact, especially when refactoring or restructuring code. A client-side check can be bypassed or skipped; a server-side status check cannot be merged past without intervention.

The gate does not catch: modifications to test files that weaken assertions without deleting them, deletion of non-test files that support testing (e.g., test helpers, mocks, fixtures), or test files deleted outside of a pull request (e.g., directly on `main`).

One limitation: the guard evaluates commits in the `base..head` range. If a test file was already deleted on `main` before the PR branch was created, the guard will not see that deletion because it only compares the PR's base and head.

## Admin step

A repository administrator or a role with appropriate permissions must configure branch protection:

1. Go to Repository Settings → Branches.
2. Click "Add branch protection rule".
3. Set Branch name pattern to `main`.
4. Enable "Require a pull request before merging".
5. Enable "Require status checks to pass before merging".
6. Select "Test file deletion guard" from the list of status checks.
7. Click Save changes.

The check is not required until this setting is actually enabled in the repository settings.

## Rollout checklist

| Step | UI path | Who can do this | Done |
|------|---------|-----------------|------|
| 1. Open repository branch protection settings | Settings → Branches | Repository admin | [ ] |
| 2. Add or edit the `main` protection rule | Settings → Branches → Add rule | Repository admin | [ ] |
| 3. Require `Test file deletion guard` | Branch protection → Status checks | Repository admin | [ ] |
| 4. Save and verify the required check on a test PR | Settings → Branches → Save | Repository admin | [ ] |