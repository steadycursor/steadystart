---
title: 'Create Prisma Migration Task'
read_only: true
type: 'command'
---

# Create Prisma Migration Task

- First run `cd libs/prisma && pnpm run migrate:status` to check if there are any migrations that have not been applied
- If there are pending migrations that have not been applied, ABORT immediately and DO NOT proceed further
- After confirming all migrations are applied, check git status to identify staged files in the `libs/prisma/src/schema/` directory
- Detect which files were changed or added and what was modified
- Create a descriptive migration name based on the changes
- Suggest 3 migration name options based on the schema changes
- If this is the first migration (no existing migrations in prisma/migrations folder), name it `init`
- Format migration names as: `add_<entity>_model`, `add_<field>_field_to_<entity>_model`, `update_<entity>_model_<field>_field`, etc.
- Always include the word "model" when referring to a model
- Always include the word "field" or "fields" when referring to fields
- When listing multiple fields, add "and" before the last field name, e.g., `add_firstName_lastName_and_locale_fields_to_user_model`
- Migration names should be lowercase with underscores
- Names should be concise but descriptive of what changed
- After I select a migration name, run `cd libs/prisma && pnpm run migrate:new -- --name="<migration_name>"`
- Confirm the migration files were created successfully
- Report any errors encountered during migration creation
- Always run migrations from the `libs/prisma` directory
- Be cautious with migrations that might affect existing data

## Common Migration Name Examples

- `add_user_model` - when adding a complete new model
- `add_firstName_field_to_user_model` - when adding a single field to a model
- `add_firstName_and_lastName_fields_to_user_model` - when adding several related fields
- `add_email_phone_and_address_fields_to_user_model` - when adding multiple fields for a specific functionality
- `update_user_model_email_field_to_required` - when changing properties of an existing field
- `add_user_model_workspace_model_relation` - when adding a relationship between models
