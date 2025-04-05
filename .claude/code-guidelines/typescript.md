# TypeScript Code Guidelines

## Variable Declarations

### Inline Usage for Single-Use Variables

Quick description: Do not declare constants that are only used once. Use their value directly inline instead.

✅ DO:

```typescript
const deleteResponse = await genqlMutation({
  prisma,
  source: {
    deleteTag: [{ id: createResponse.createTag.id }, { id: true }],
  },
  userId: seededData.users[0].id,
  workspaceId: seededData.workspaces[1].id,
});
```

❌ DON'T:

```typescript
const tagId = createResponse.createTag.id;

const deleteResponse = await genqlMutation({
  prisma,
  source: {
    deleteTag: [{ id: tagId }, { id: true }],
  },
  userId: seededData.users[0].id,
  workspaceId: seededData.workspaces[1].id,
});
```

### Direct Reference to Static Data

Quick description: Always reference static data (like seededData) directly without creating intermediate variables.

✅ DO:

```typescript
const deleteResponse = await genqlMutation({
  prisma,
  source: {
    deleteTag: [{ id: seededData.tags[0].id }, { id: true }],
  },
  userId: seededData.users[0].id,
  workspaceId: seededData.workspaces[0].id,
});

const tag = await prisma.tag.findUnique({
  where: { id: seededData.tags[0].id },
});
```

❌ DON'T:

```typescript
const tagToDelete = seededData.tags[0]; // Unnecessary intermediate variable

const deleteResponse = await genqlMutation({
  prisma,
  source: {
    deleteTag: [{ id: tagToDelete.id }, { id: true }],
  },
  userId: seededData.users[0].id,
  workspaceId: seededData.workspaces[0].id,
});

const tag = await prisma.tag.findUnique({
  where: { id: tagToDelete.id },
});
```

### Exceptions

Variables may be declared separately if:

- They are used multiple times
- The expression is complex and would harm readability if used inline
- The variable name provides important semantic context that would be lost with inline usage
- Debugging purposes require a specific variable to be inspectable

## Types vs Interfaces

Quick description: Always use `type` for declaring types, avoid interfaces.

✅ DO:

```tsx
export type UpsertTagNamespaceFormModalProps = {
  tagNamespace: UpsertTagNamespaceFormProps['tagNamespace'];
  trigger?: ReactElement;
};
```

❌ DON'T:

```tsx
interface UpsertTagNamespaceFormModalProps {
  tagNamespace: UpsertTagNamespaceFormProps['tagNamespace'];
  trigger?: ReactElement;
}
```

## Function Definitions

Quick description: Use arrow functions with `export const` syntax instead of standard function declarations.

✅ DO:

```typescript
export const getCollectionAncestors = async ({ collection, ctx }: GetCollectionAncestorsArgs) => {
  // Implementation
};
```

❌ DON'T:

```typescript
export async function getCollectionAncestors({ collection, ctx }: GetCollectionAncestorsArgs): Promise<string[]> {
  // Implementation
}
```

## Type Parameters

Quick description: Use descriptive names with `Args` suffix for function parameters and prefer `Pick<>` over custom types when referencing model properties.

✅ DO:

```typescript
export type GetCollectionAncestorsArgs = {
  collection: Pick<Collection, 'id' | 'parentCollectionId'>;
  ctx: Context;
};
```

❌ DON'T:

```typescript
export type CollectionInfo = {
  id: string;
  parentCollectionId: string | null;
};

export type GetCollectionAncestorsParams = {
  collection: CollectionInfo;
  ctx: Context;
};
```

## Return Types

Quick description: Prefer implicit return types when possible, let TypeScript infer the types.

✅ DO:

```typescript
export const getCollectionAncestors = async ({ collection, ctx }: GetCollectionAncestorsArgs) => {
  // TypeScript will infer the return type
};
```

❌ DON'T:

```typescript
export const getCollectionAncestors = async ({ collection, ctx }: GetCollectionAncestorsArgs): Promise<string[]> => {
  // Explicitly specified return type
};
```