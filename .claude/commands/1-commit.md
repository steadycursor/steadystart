---
title: 'Git Commit Task'
read_only: true
type: 'command'
---

# Create new git commit task

- Takes all staged changes, suggests a commit message, ALWAYS asks for confirmation, and creates the commit ONLY after explicit approval
- Format of commit message is `[package1,package2] description of changes`
  - Package names should be in square brackets, listing all affected packages
  - If 80% or more changes are focused on a single feature/functionality, mention only the main package and ignore minor related changes
  - Description should start with lowercase letter
  - Description should be concise and explain what was changed
  - Commit messages should be based only on staged files
- Always provide at least 3 message options in a numbered list; I will choose one or request a different option
- If there are no staged changes, abort the process with a message in red text: "No changes staged for commit. Aborting."
- NEVER use git add commands - you are forbidden from staging files yourself
- NEVER ask about staging files - assume all files I want to commit are already staged
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
