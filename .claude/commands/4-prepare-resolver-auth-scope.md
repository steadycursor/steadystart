---
title: 'Prepare Resolver Auth Scope Task'
read_only: true
type: 'command'
---

# Prepare Resolver Auth Scope

This task helps set up proper authorization scopes for GraphQL resolvers, with a focus on correctly handling ID and IDs fields.

## Usage

```
task:prepare-resolver-auth-scope <filepath to GraphQL mutation or query>
```

IMPORTANT: Always follow rules in `../../CLAUDE.md` if not stated here otherwise.

## Process

1. Analyze the resolver file to identify all ID and [ID] arguments
2. Determine the appropriate auth scope for each ID type
3. Implement the correct auth scope pattern
4. Test the resolver to ensure IDs are properly protected

## ID Access Validation Rules

### Rule 1: Choose the correct auth scope for each ID type

- **Workspace IDs**: Use `userHasAccessOnWorkspace` scope

  ```typescript
  authScopes: (_parent, args, _ctx) => ({
    accessPolicy: 'authenticated',
    userHasAccessOnWorkspace: { id: args.workspaceId }, // For direct workspace IDs
  }),
  ```

- **Model IDs** (collections, etc.): Use `modelItemsBelongToWorkspace` scope

  ```typescript
  authScopes: (_parent, args, _ctx) => ({
    accessPolicy: 'authenticated',
    modelItemsBelongToWorkspace: { id: args.id, model: 'collection' }, // Specify model type
  }),
  ```

- **Multiple IDs**: Use `modelItemsBelongToWorkspace` with ids array
  ```typescript
  authScopes: (_parent, args, _ctx) => ({
    accessPolicy: 'authenticated',
    modelItemsBelongToWorkspace: { ids: args.collectionIds, model: 'collection' },
  }),
  ```

### Rule 2: Handling Nullable ID Arguments

For nullable (optional) ID arguments:

- Always check IDs when present, skip validation when null/undefined
- Use the object spread pattern to conditionally add auth scopes

**General pattern for nullable IDs:**

```typescript
authScopes: (_parent, args, _ctx) => ({
  accessPolicy: 'authenticated',
  userHasAccessOnWorkspace: true, // Base auth checks

  // Conditionally add auth scope only when ID exists
  ...(args.nullableId ? { modelItemsBelongToWorkspace: { id: args.nullableId, model: 'modelType' } } : {}),
}),
```

### Rule 3: Global workspace context

For queries/mutations operating within the current workspace context:

- Use the global workspace verification:
  ```typescript
  authScopes: {
    accessPolicy: 'authenticated',
    userHasAccessOnWorkspace: true, // User has access to current workspace context
  },
  ```

### Rule 4: User operations on own data

For operations where users act on their own data:

- Simply use `authenticated` without extra ID checks:
  ```typescript
  authScopes: {
    accessPolicy: 'authenticated',
  },
  ```
