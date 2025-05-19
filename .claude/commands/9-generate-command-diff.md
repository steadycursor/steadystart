---
title: 'Generate Command Diff Task'
read_only: true
type: 'command'
---

# Generate Command Diff

This task creates a portable diff file of command changes that can be imported into another project with similar command structure.

## Process

1. Identify command files in staged changes:

   - Check for staged files in `.claude/commands/` directory
   - If no command files are staged, display error in red text and exit: "No command files are staged. Please stage at least one command file and try again."
   - If one command file is staged, use it automatically
   - If multiple command files are staged, list them with numbers and ask user to select one via numbered list

2. Generate the diff of the selected command file:

   - Extract the original file content from HEAD (pre-modification)
   - Extract the new file content from staged changes
   - Generate a semantic diff showing only the actual changes (not the entire file)

3. Create a portable markdown file:

   - Format: `command-diff-[original-filename]-[date].md`
   - Structure:

     ````markdown
     # Command Diff: [Original Command Name]

     Generated: [Date and Time]
     Original File: [Path to original file]

     ## Changes

     ### Additions

     ```diff
     + Added lines
     ```
     ````

     ### Deletions

     ```diff
     - Removed lines
     ```

     ### Modified Sections

     #### Section 1: [Section Name]

     **Before:**

     ```
     Original content
     ```

     **After:**

     ```
     New content
     ```

     ## Import Instructions

     This file represents a diff of command changes from another project. After loading this file, your task is to integrate these changes into an equivalent command in the current project.

     To import these changes to a similar command in another project:

     1. Identify the corresponding command file in the current project

        - Search for a command with a similar name or purpose
        - If unsure, list all commands in the current project as a numbered list to help identify the matching command
        - Commands may have different filenames but similar functionality across projects

     2. Review the changes carefully to understand what modifications were made in the source project

        - These changes represent improvements, fixes, or new features for this custom command from another project
        - The goal is to adapt and integrate these changes into the this project

     3. Apply the changes shown in the diff, adapting as necessary for the this project

        - Consider project-specific differences in naming conventions, directory structures, etc.
        - Preserve existing functionality while incorporating the new features or improvements

     4. Test the modified command to ensure it works as expected in the current project environment
        - Commands may behave differently across projects due to different dependencies or configurations
        - Validate that the adapted changes maintain compatibility with the current project

     ```

     ```

4. Save the file:

   - Save to `/tmp/command-diff-[original-filename]-[date].md`
   - Display the full path in green text: "Diff file generated: [path]"
