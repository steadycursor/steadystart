---
title: 'Toggle Stage Command'
read_only: true
type: 'command'
---

# Toggle Stage Command

This command temporarily unstages all files to allow for a focused commit, then restores the original staging state.

## Process

1. Save a list of all currently staged files and their state
2. Unstage all files
3. Wait for user to make their own commit with only specific files they manually stage
4. After user confirms completion, re-stage the originally staged files (excluding those modified during the process)

## Detailed Steps

- Get all currently staged files using `git diff --name-only --cached`
- For each staged file, record its current hash state
- Unstage all files using `git restore --staged .`
- Inform user they can now manually stage and commit their specific files
- When user confirms they've completed their commit, re-stage the original files:
  - Check each file's current hash against the saved hash
  - Only re-stage files whose hash hasn't changed (meaning they weren't modified during the process)
  - Skip re-staging files that were modified to avoid overwriting user's changes

## Important Notes

- If no files are staged when this command is run, abort with a message "No files currently staged. Nothing to do."
- Skip re-staging any files that were modified during the user's commit process
- This command never creates commits itself - it only manages the staging area
- The command will need to wait for user input before re-staging files
- Information about staged files is stored in a temporary file at `.claude/tmp/staged_files_state.md`
- This allows the command to be resumed if interrupted, by reading the state from the temporary file

## Implementation

First, ask the user whether they want to:

1. Start the process from the beginning (save state, unstage files)
2. Resume from a previous interruption (restore staged files)

For starting from the beginning:

1.1. Run `git diff --name-only --cached` to get all staged files
1.2. For each file, get its hash with `git hash-object <file>`
1.3. Save the list of files and their hashes to a temporary file at `.claude/tmp/staged_files_state.md` (only create when needed)
1.4. Run `git restore --staged .` to unstage all files
1.5. Tell user "You can now make your commit with only the files you need."
1.6. Ask user to confirm when they're done: "Press Enter when you're ready to restore the previously staged files"

For resuming after interruption:

2.1. Check if the temporary file `.claude/tmp/staged_files_state.md` exists
2.2. If it exists, read the state from the file
2.3. For each originally staged file, check current hash against saved hash
2.4. If hash matches (file unchanged), run `git add <file>` to re-stage it
2.5. If hash doesn't match (file changed), skip re-staging and log as skipped
2.6. Display summary: "Re-staged X files. Skipped Y files that were modified."
2.7. Delete the temporary file after completion
