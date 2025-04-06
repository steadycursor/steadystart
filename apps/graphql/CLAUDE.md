# GraphQL Package Guidelines

## Resolvers

- When adding a new resolver, always add it to `/workspaces/steadystart/apps/graphql/src/schema.ts`
- Follow the existing pattern for organizing resolvers by model
- Write tests for all resolvers
- Use auth scopes to handle permissions