# Prepare validation schema

This task helps create or update validation schemas for GraphQL mutations.

## Usage

```
task:prepare-validation-schema <filepath to GraphQL mutation or query>
```

## Process

1. Extract mutation/query name from the file path (e.g., createCollection from createCollection.ts)
2. Examine the GraphQL file to identify argument structure in the args section
3. Create / update a validation schema file at libs/validations/src/schemas/<mutationName>Schema.ts
   - Use appropriate zod validators: `z.string().min(2)`
   - For enums, check they are properly exported and available
   - Enums take from `@steadystart/enums`, do not use `@steadystart/prisma`
4. Add the new schema export to `libs/validations/src/schemas/index.ts`
5. Update the GraphQL resolver file to import and use the validation schema
   - Import schema in resolver like `import { <mutationName>Schema } from '@steadystart/validations';`
   - Do NOT modify existing args in mutation/query - validation schema should adapt to them
   - Add or update `validate: { schema: <mutationName>Schema },` above `resolver:` line, if existing `validate` key, replace it, same is for import, just one validation schema per resolver
6. Run build in the validations package: `pnpm --filter=@steadystart/validations run build`

## Important rules

- Do NOT modify existing args in mutation/query - validation schema should adapt to the existing structure
- Do NOT add message fields in zod validators since they are handled by i18n
- If updating an existing resolver and there are inconsistencies between resolver args and validation schema, FIX THE VALIDATION SCHEMA to match the resolver args, not the other way around

## Fixing inconsistencies

When updating an existing resolver or validation schema, you may find inconsistencies:

1. Check if the validation schema accurately reflects the resolver args
2. If there are discrepancies, ALWAYS update the validation schema to match the resolver args
3. Common inconsistencies to fix:
   - Required vs optional fields:
     - If arg is `required: true` in resolver but optional in schema → Make field required in schema
     - If arg exists in resolver but missing in schema → Add to schema
     - If arg is nullable in resolver but required in schema → Make nullable in schema
   - Type mismatches:
     - Ensure enum types match between schema and resolver
     - Fix any string/number/boolean type mismatches

## Common issues and solutions

- Enum dependencies: Ensure enums are built first with `pnpm --filter=@steadystart/enums run build`
- Fix variable references: Check variable names in resolver methods match

## Checklist

- [ ] Build dependencies (enums package if needed)
- [ ] Create/update schema file with appropriate validation rules (without message fields)
- [ ] Ensure validation schema matches resolver args exactly
- [ ] Update index.ts to export the new schema
- [ ] Update mutation to import and use the schema (don't modify args)
- [ ] Run build in the validations package
- [ ] Fix any build errors

## Examples

### Basic validation creation

- Mutation: `/workspaces/steadystart/apps/graphql/src/resolvers/workspace/mutations/createWorkspace.ts`
- Schema: `/workspaces/steadystart/libs/validations/src/schemas/createWorkspaceSchema.ts`
- Validation: `export const createWorkspaceSchema = z.object({ name: z.string().min(2) })`

### Fixing inconsistencies example

- Resolver arg: `title: t.arg({ type: 'String', required: true })`
- Current validation: `z.object({ title: z.string().nullable() })`
- Fixed validation: `z.object({ title: z.string().min(1) })` // Make required to match resolver
