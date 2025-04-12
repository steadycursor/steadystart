---
title: 'Git Commit Task'
read_only: true
type: 'command'
---

# Create new git commit task

- Takes all staged changes, suggests a commit message, ALWAYS asks for confirmation, and creates the commit ONLY after explicit approval
- This task is one of ONLY two places where committing is allowed (the other being commit-fast)
- Format of commit message depends on the affected files:
  - For package changes (e.g., apps/graphql): `[package1,package2] description of changes`
  - For configuration files in root or specialized directories:
    - .do directory: `[.do] description of changes`
    - ESLint config: `[eslint] description of changes`
    - TypeScript config: `[typescript] description of changes`
    - Git-related files: `[gitignore] description of changes`
    - Claude related files (e. g. CLAUDE.md or changes in .claude folder): `[claude] description of changes`
    - Other root configs: use appropriate descriptor in square brackets
  - For functionality spanning multiple packages: use the functionality name as scope
  - Golden rule: Use package names for package changes, otherwise use functionality/directory scope
  - If 80% or more changes are focused on a single feature/functionality, mention only the main package(s) and ignore minor related changes
  - Description should start with lowercase letter
  - Description should be concise and explain what was changed
  - Commit messages should be based only on staged files
- Always provide at least 5 message options in a numbered list; I will choose one or request a different option
- The scope in square brackets should be consistent across all suggested message options - it's a fixed rule based on the files changed, not something to vary between options
- When suggesting commit messages, use `git log -n 100 --oneline` to review the most recent commit messages for inspiration on format and style
- If there are no staged changes, abort the process with a message in red text: "No changes staged for commit. Aborting."
- NEVER ask about staging files - assume all files I want to commit are already staged
- NEVER use git add commands - you are forbidden from staging files yourself
- Format the suggested commit messages in orange text to make them more readable in the terminal
- NEVER proceed with `git commit -m` without explicit confirmation from me first
- Only after I explicitly confirm or modify the commit message, proceed with `git commit -m "message"`
- If I tell you that you can push the changes, you can run `git push` directly without asking for permission
- Do NOT add Claude co-authorship footer to commits
- Read ONLY staged files

## Examples of Good Commit Messages

- `[ui] fix username retrieval issues in Header component on initial render`
- `[alerts] new notification module for system and maintenance type of alerts`
- `[queue-payment-processing] moved generateMonthlyStatementJob to queue from admin`
- `[admin] new action for creating manual adjustments in user profile`

## Precommit Checks

- Precommit checks run before the main commit action
- Only run precommit checks that meet their triggering conditions
- If any precommit check fails, immediately abort the entire process (both precommit and commit actions)
- Display an error message and do not proceed until the issue is fixed

### Precommit Check: GraphQL Mutation/Query Argument Validation

- **Trigger Condition**: When editing arguments in an existing or new GraphQL mutation/query
- **What to Check**: Verify that a corresponding validation schema exists and matches the arguments structure
- **Failure Action**:
  - Abort the commit process and display detailed error message
  - Suggest to run `task prepare-validation-schema` but ALWAYS ask for user confirmation first
  - Do NOT run the task without explicit user approval

### Precommit Check: ID Access Permission Validation

- **Trigger Condition**: When creating or updating GraphQL queries/mutations that have ID or [ID] in their arguments
- **What to Check**: Verify that all ID parameters are checked for user access permissions before use
- **Specific Checks**:
  - Single IDs should use appropriate auth scopes
  - All ID parameters must be validated before being used in database queries
  - Auth scopes must correctly reference the appropriate ID fields (not unrelated ones)
- **Failure Action**:
  - Abort the commit process and display detailed error message about missing or incorrect access checks
  - Suggest to run `task prepare-resolver-auth-scope` but ALWAYS ask for user confirmation first
  - Do NOT run the task without explicit user approval

### Precommit Check: Code Guidelines Compliance

- **Trigger Condition**: When editing any TypeScript (.ts) or React (.tsx) files
- **What to Check**: Verify that the changes comply with the appropriate code guidelines
- **Specific Checks**:
  - For TypeScript files (.ts): Validate against the TypeScript code guidelines in `./.claude/code-guidelines/typescript.md`
  - For React files (.tsx): Validate against both the React AND TypeScript code guidelines in `./.claude/code-guidelines/react.md` and `./.claude/code-guidelines/typescript.md`
- **Failure Action**:
  - Abort the commit process and display detailed error message about code guidelines violations
  - Show the specific guideline(s) being violated
  - Suggest fixes for common violations based on the guidelines
  - Wait for user to fix the issues before proceeding with the commit
