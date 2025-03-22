# Claude Guide

This file contains project-specific instructions that Claude should read at the start of each conversation and maintain in memory throughout the entire interaction. **IMPORTANT:** Once this file has been read or updated, it MUST be loaded at the beginning of any new conversation to ensure awareness of communication requirements, custom tasks, etc.

## Default Mode

- Architect mode should be enabled by default
- Focus on providing detailed analysis, patterns, trade-offs, and architectural guidance

## Permissions

- Always allowed to use `ls`, `cd`, `mkdir` commands freely to navigate the project
- Always allowrd to read all files and list all folder structure needed for task completion
- If user modifies a file between reads, assume the change is intentional

## Code Style Guidelines

- **Files/Components**: PascalCase for components, camelCase for utils/hooks
- **Types**: Strict typing, descriptive generics, no implicit any, named prop interfaces
- **Naming**: Function types use FunctionNameArgs, class options use ClassNameOptions, hook args use UseHookNameArgs, React component props use ComponentNameProps
- **Error Handling**: Custom error classes, i18n error messages, meaningful error types
- **Patterns**: Prefer immutability (const over let), no direct process.env usage, prefer ts-pattern over switch
- **Components**: One component per file, functional components with hooks
- **CSS**: Tailwind with twMerge for class composition
- **Dates**: Use Luxon over native Date objects
- **Type organization**: Don't create `index.ts` files in `types` directories to re-export types, import directly from individual type files
- **Comments**:
  - Use minimal comments and only in English
  - Add comments only when code clarity is insufficient or to explain non-standard solutions (like using `any`) or hard to read / understand code sections
  - Don't use JSDoc style function header comments

## Communication Style

- NEVER suggest or offer staging files with git add commands
- When asking questions, always provide multiple numbered options when appropriate:

  - Format as a numbered list: `1. Option one, 2. Option two, 3. Option three`
  - Example: `1. Yes, continue with the changes, 2. Modify the approach, 3. Stop and cancel the operation`

- When analyzing code for improvement:

  - Present multiple implementation variants as numbered options
  - For each variant, provide at least 3 bullet points explaining the changes, benefits, and tradeoffs
  - Format as: "1. [short exmplanation of variant or shorly Variant]" followed by explanation points

- When implementing code changes:

  - If the change wasn't preceded by an explanation or specific instructions
  - Include within the diff a bulleted list explaining what was changed and why
  - Explicitly note when a solution is opinionated and explain the reasoning

- When completing a task, ask if I want to:
  1. Run task:commit (need to manually stage files first)
  2. Neither (stop here)

## Custom Tasks

Custom tasks are stored in the `./.claude/tasks/` directory as Markdown files. The task name corresponds to the filename (without extension).

When user types only the word "task", show a numbered list of available tasks from those listed in this section and let the user select which one to run by number. Do not list or search for additional tasks in the `.claude/tasks/` directory - only use the tasks explicitly listed here. Once task is selected, read the file `.claude/tasks/{selected-task}.md` and follow instructions.

Available tasks:

- `commit`
- `commit-fast`
- `prepare-validation-schema`

## Path References

- When a path starts with `./` in any file containing instructions for Claude, it means the path is relative to that file's location. Always interpret relative paths in the context of the file they appear in, not the current working directory.
