---
title: 'Git Commit Specific Files Task'
read_only: true
type: 'command'
---

# Create new git commit for specific files

- **MANDATORY**: Always read commit-fast.md at the start of each command execution to get the latest instructions
- Takes a list of specific files as argument instead of using staged changes
- If no files are provided as arguments, ask the user which files they want to commit at the beginning
- Once files are specified, follow the complete commit-fast flow including all precommit checks
- Suggest commit message options based on the specified files (not staged files)
- When commit message is approved, automatically stage ONLY the specified files with `git add <file1> <file2> ...`
- Then execute the commit with `git commit -m "message"`

## File Handling

- Accept file paths as command arguments (space-separated list)
- If no arguments provided, prompt user: "Which files would you like to commit? Please provide file paths separated by spaces."
- Validate that all specified files exist and have changes
- Only read and analyze the specified files for commit message generation
- Stage only the specified files before committing

## Process Flow

1. **File Collection**: Get file list from arguments or ask user
2. **Load Instructions**: Read commit-fast.md to get current commit flow and formatting rules
3. **Analysis**: Analyze only the specified files for changes
4. **Precommit Checks**: Run all precommit checks from commit-fast.md on the specified files
5. **Message Generation**: Generate commit message options based on specified files only
6. **Best Option Presentation**: Present the best option (usually #1) WITH FULL TEXT and wait for user response:
   - ALWAYS show the complete recommended option text so user can see it immediately
   - Format: "I recommend Option 1: [FULL COMMIT MESSAGE TEXT HERE]"
   - Simply ask: "Say 'ok' if you want to continue, or tell me what to do differently."
   - If user says "ok" → proceed with staging and commit
   - If user asks for alternatives → show remaining 4 options in numbered list
   - If user provides custom message → use their message instead
7. **Staging**: Use `git add` to stage only the specified files (ONLY after message approval)
8. **Commit**: Execute `git commit -m "approved_message"`

## Important Notes

- All commit message formatting rules from commit-fast.md apply
- All precommit checks from commit-fast.md must be executed
- The scope determination should be based on the specified files, not staged files
- After successful commit, ask if user wants to push changes
- If commit fails, inform user and ask for next steps
