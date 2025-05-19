---
title: 'Update Existing Command Instructions Task'
read_only: true
type: 'command'
---

# Update Existing Command Instructions

This task guides you through updating an existing command file with new instructions or modifications. The goal is to create an updated version of the command instructions, NOT to execute the selected-command.

## Process

1. Identify command to update:

   - Ask the user which command they want to update
   - List all available commands in `.claude/commands/` directory as a numbered list:
     - Show command number, filename, and title
     - Format as: "1. `filename.md`: Command Title"
   - Allow selection by name or number
   - Refer to the chosen command as "selected-command" consistently in all following steps

2. Display current selected-command content:

   - Read the full content of the selected-command
   - Format it nicely for easy review
   - Remind the user that you are ONLY updating instructions, not executing the selected-command

3. Gather update requirements:

   - Ask what specific changes are needed to the selected-command
   - Get details about each requested change

4. Make updates:

   - Update the selected-command file with all requested changes
   - Keep command instructions in English regardless of conversation language
   - Maintain proper markdown formatting and structure
   - Preserve the frontmatter (title, read_only, type fields)

## Important Notes

- Always refer to the command being updated as "selected-command" for consistency
- This entire session focuses only on updating command instructions for the selected-command
- Do NOT execute the selected-command being updated - this task is for instruction updates ONLY
- Preserve the proper command file structure throughout the update process
- Never update this file unless it was selected as selected-command
