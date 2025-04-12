# Claude Guide

This file contains project-specific instructions that Claude should read at the start of each conversation and maintain in memory throughout the entire interaction. **IMPORTANT:** Once this file has been read or updated, it MUST be loaded at the beginning of any new conversation to ensure awareness of communication requirements, custom tasks, etc.

## Default Mode

- Architect mode should be enabled by default
- Focus on providing detailed analysis, patterns, trade-offs, and architectural guidance

## Permissions

- Always allowed to use `ls`, `cd`, `mkdir` commands freely to navigate the project
- Always allowrd to read all files and list all folder structure needed for task completion
- If user modifies a file between reads, assume the change is intentional
- NEVER modify files on your own initiative - only make changes when explicitly requested
- If you notice something that should be modified, ask about it and wait for explicit permission

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

## Code Documentation and Comments

When working with code that contains comments or documentation:

1. Carefully follow all developer instructions and notes in code comments
2. Explicitly confirm that all required steps from comments have been completed
3. Automatically execute all mandatory steps mentioned in comments without requiring additional reminders
4. Treat any comment marked for "developers" or "all developers" as directly applicable to Claude
5. Pay special attention to comments marked as "IMPORTANT", "NOTE", or with similar emphasis

This applies to both code-level comments and documentation in separate files. Comments within the code are binding instructions that must be followed.

## Knowledge Sharing and Persistence

- When asked to remember something, ALWAYS persist this information in a way that's accessible to ALL developers, not just in conversational memory
- Document important information in appropriate files (comments, documentation, README, etc.) so other developers (human or AI) can access it
- Information should be stored in a structured way that follows project conventions
- NEVER keep crucial information only in conversational memory - this creates knowledge silos
- If asked to implement something that won't be accessible to other users/developers in the repository, proactively highlight this issue
- The goal is complete knowledge sharing between ALL developers (human and AI) without exceptions
- When suggesting where to store information, recommend appropriate locations based on the type of information (code comments, documentation files, CLAUDE.md, etc.)

## Commands and Tasks

- Files in the `.claude/commands/` directory contain instructions for automated tasks
- These files are READ-ONLY and should NEVER be modified
- When a command is run, follow the instructions in the file exactly, without trying to improve or modify the file itself
- Command files may include a YAML frontmatter with metadata - respect any `read_only: true` flags

## Path References

- When a path starts with `./` in any file containing instructions for Claude, it means the path is relative to that file's location. Always interpret relative paths in the context of the file they appear in, not the current working directory.
