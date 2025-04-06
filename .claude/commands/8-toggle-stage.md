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

## Implementation

1. Run `git diff --name-only --cached` to get all staged files
2. For each file, get its hash with `git hash-object <file>`
3. Run `git restore --staged .` to unstage all files
4. Tell user "You can now make your commit with only the files you need."
5. Ask user to confirm when they're done: "Press Enter when you're ready to restore the previously staged files"
6. When user confirms:
   - For each originally staged file, check current hash against saved hash
   - If hash matches (file unchanged), run `git add <file>` to re-stage it
   - If hash doesn't match (file changed), skip re-staging and log as skipped
7. Display summary: "Re-staged X files. Skipped Y files that were modified."
