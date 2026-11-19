---
name: review-code-change
description: Review a code change or pull request to produce evidence-based findings, regression risks, and verification status.
---

Verified manual paste-in on CodeMie Claude Desktop (2026-11-19). Native loading: not yet tested elsewhere.

# Code Review Skill

## Purpose

Review a proposed code change and produce evidence-based findings, identify regression risks, and report verification status. This Skill is portable across any language, framework, repository, and test runner.

## Workflow

1. **Understand the change and its task context.**
   Read the task description or linked requirements. Identify the acceptance criteria, the intended behavior, and any constraints. Note what is provided and what is missing.

2. **Inspect the diff and identify affected behavior.**
   Examine the added, modified, and removed lines. Determine what behavior changes, what behavior is preserved, and what is newly introduced. Map each change to a functional area.

3. **Assess complexity and maintainability.**
   Look for high cyclomatic complexity, deeply nested logic, unnecessary abstractions, or indirection that obscures intent. Flag changes that add complexity without clear benefit.

4. **Trace all usages of modified shared logic.**
   Find every place in the repository where the changed functions, modules, or shared logic are imported, called, or depended on. Do not assume the change is isolated.

5. **Inspect and run relevant tests when feasible.**
   Locate tests covering the changed code and its dependents. If the repository's test runner can be executed, run the relevant tests. If tests cannot be run (no test suite, missing dependencies, no test runner configured, or no executable environment), state why and distinguish that from a passing result. Never invent test results.

6. **Evaluate edge cases, error handling, and regression risks.**
   Consider empty inputs, null/undefined values, invalid types, boundary values, concurrency, and failure modes. Assess whether error handling is adequate. Identify any existing behavior that the change might break in other usages.

7. **Produce a concise evidence-based review.**
   Report findings with file references and line numbers where available. Distinguish confirmed issues (directly observed in code or tests) from potential risks (hypotheses requiring verification). Include verification status: what was checked, what could not be checked, and why.

## Output format

- Summary of the change
- Confirmed observations (evidence cited)
- Potential risks and questions (unverified)
- Regression risk assessment
- Verification status (what was run, what was not, and why)
- Recommendations