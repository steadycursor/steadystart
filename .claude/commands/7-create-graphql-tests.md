---
title: 'Create GraphQL Tests'
read_only: true
type: 'command'
---

# Create GraphQL Tests

This command helps create comprehensive tests for GraphQL resolvers, following the project's testing patterns and ensuring proper validation and auth scope checks.

## Usage

- Takes a GraphQL resolver path as input and generates tests for that resolver
- Required argument: `description` - A brief description of what the tests should cover

## Process

1. START by asking the user for:
   - The resolver file path to test (if not already provided)
   - Specific test instructions or considerations (if not already provided)
2. Once you have this information, analyze the resolver file to understand its functionality, arguments, and return values
3. Before writing any tests, perform the following checks and provide a summary report:
   - Run the equivalent of command `4-prepare-resolver-auth-scope` to check all auth scopes are properly configured
   - Run the equivalent of command `3-prepare-validation-schema` to verify schemas are up-to-date
   - If an existing test file exists, verify that test descriptions (test("...")) accurately describe what each test is verifying
   - Present this analysis and ask for confirmation before proceeding with test creation
4. Check that the resolver has proper validation schemas (as required by `3-prepare-validation-schema.md`)
5. Verify that all ID parameters have appropriate auth scope checks (as required by `4-prepare-resolver-auth-scope.md`)
6. Generate a test suite with the following cases:
   - Success case for basic usage
   - Success case for each major parameter combination
   - Failure cases for invalid inputs
   - Failure cases for auth/permission scenarios
   - Edge cases specific to the resolver's functionality
7. Provide a summary of findings and suggested tests

IMPORTANT: Do NOT include ANY comments in the generated tests, as specified in the Test Structure section below.

## Important Instructions

IMPORTANT: Tests for a resolver should always be in a single file:

- Each GraphQL resolver should have exactly one test file
- Never create a new test file when asked to add tests for a new field
- Always add new tests to the existing test file for that resolver
- The pattern is: one resolver = one test file

When asked to create a test for a new field:

1. Add a new separate `test()` function to the existing resolver test file
2. Do not modify existing test functions unless specifically instructed to do so
3. NEVER modify existing snapshots - leave empty snapshots that the user will populate themselves by running the tests
4. Each new field should get its own test function, not be added to existing field tests
5. Follow the naming pattern used in other tests (e.g., `Should update, keep and clear [fieldName]`)

## Field Testing Structure

### Update, Keep, and Clear Tests

IMPORTANT: "Update, keep, clear" tests are needed ONLY for update mutations. These tests are NOT needed for create or delete mutations.

Pro každé pole v GraphQL mutaci by měl existovat samostatný test, který testuje všechny tři scénáře:

1. **Update**: Nastavení nové hodnoty
2. **Keep**: Zachování existující hodnoty (předání `undefined`)
3. **Clear**: Vyčištění hodnoty (předání `null`) - pouze pokud je pole nullovatelné

```typescript
test('Should update, keep and clear [fieldName] field', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  // 1. UPDATE - Set new value
  const responseUpdate = await genqlMutation({
    // mutation details
  });

  // 2. KEEP - Send undefined
  const responseKeep = await genqlMutation({
    // mutation details with fieldName: undefined
  });

  // 3. CLEAR - Send null
  const responseClear = await genqlMutation({
    // mutation details with fieldName: null
  });

  // Always use empty inline snapshots with proper spacing
  expect(responseUpdate).toMatchInlineSnapshot();

  expect(responseKeep).toMatchInlineSnapshot();

  expect(responseClear).toMatchInlineSnapshot();
});
```

## Testování rozhraní a union typů

Pro testování rozhraní a union typů vždy používej fragmenty:

```typescript
{
  on_[ConcreteType]: {
    id: true,
    // další pole specifická pro daný typ
  }
}
```

Například pro AtomBookmark:

```typescript
{
  on_AtomBookmark: {
    id: true,
    title: true,
    url: true,
  }
}
```

## Key Principles

1. **One field per test**: Each test should focus on one field and its three scenarios.
2. **Only inline snapshots**: Never use `.toMatchObject`, `.toBeInstanceOf`, `.toContain` or other assertion methods.
3. **Empty snapshots**: Always use empty inline snapshots - `expect(response).toMatchInlineSnapshot()`.
4. **Spacing between snapshots**: Always maintain an empty line between individual inline snapshots.
5. **Special cases separately**: Tests for validations, errors, and special cases should be implemented as separate tests.

## Test File Structure

The test files should follow this structure:

1. First success tests (mutations/queries with all fields and individual field tests)
2. Failure tests
3. Helper functions (if needed)

IMPORTANT: If the existing test file does not follow this structure, reorganize the tests to match this pattern before adding new tests. Move success tests to the top, add the Failures section divider (only if there are failure tests), move failure tests to the middle, and add the Helpers section divider (only if there are helper functions). Never add empty section dividers with no tests or functions in them.

```typescript
// Success tests for mutations/queries with multiple fields
test('Should execute with all fields', async () => {
  // ...
});

// Tests for individual fields - that are clearable
test('Should update, keep and clear field1 field', async () => {
  // ...
});

// Tests for individual fields - that are not clearable, value with null and undefined should keep value
test('Should update and keep field2 field', async () => {
  // ...
});

// **************************
// *****    Failures
// **************************

// Tests for validations and errors
test('Should fail when using invalid value', async () => {
  // ...
});

test('Should fail with authorization error', async () => {
  // ...
});

// **************************
// *****    Helpers
// **************************

// Helper functions if needed
function helperFunction() {
  // ...
}
```

## Understanding null/undefined behavior

Special attention should be paid to null and undefined, as they have different behaviors in GraphQL and Prisma:

- `undefined` means "do not change this field"
- `null` means "explicitly set this field to NULL"

Therefore, both scenarios should be tested separately.

## Test results analysis

When running tests with null values, pay attention to validation results:

- If a validation schema doesn't allow null values, the operation will fail
- If a validation schema allows null values, the field will be cleared in the database

This test pattern helps identify fields that can or cannot be cleared, which is important for API behavior documentation.

### Example test for field test

```
test('Should update, keep and clear title field', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const responseUpdate = await genqlMutation({
    prisma,
    source: {
      updatePost: [
        {
          id: seededData.posts[0].id,
          title: 'Updated Post Title',
        },
        { id: true, title: true, createdAt: true },
      ],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  const responseKeep = await genqlMutation({
    prisma,
    source: {
      updatePost: [
        {
          id: seededData.posts[0].id,
          title: undefined,
        },
        { id: true, title: true, createdAt: true },
      ],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  const responseClear = await genqlMutation({
    prisma,
    source: {
      updatePost: [
        {
          id: seededData.posts[0].id,
          title: null,
        },
        { id: true, title: true, createdAt: true },
      ],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(responseUpdate).toMatchInlineSnapshot(`
    {
      "updatePost": {
        "createdAt": "2023-01-01T00:00:00.000Z",
        "id": "post1",
        "title": "Updated Post Title",
      },
    }
  `);

  expect(responseKeep).toMatchInlineSnapshot(`
    {
      "updatePost": {
        "createdAt": "2023-01-01T00:00:00.000Z",
        "id": "post1",
        "title": "Updated Post Title",
      },
    }
  `);

  expect(responseClear).toMatchInlineSnapshot(`
    {
      "updatePost": {
        "createdAt": "2023-01-01T00:00:00.000Z",
        "id": "post1",
        "title": null,
      },
    }
  `);
});
```

## Understanding seededData

Before using any seededData values, examine its structure to make appropriate choices:

- **Workspaces**: seededData.workspaces[0] is a different workspace than seededData.workspaces[1]
- **Users**: Check which workspace each user has access to
- **Related entities**: Ensure entities are from the correct workspace for proper auth testing
- **IDs vs entire objects**: Always use direct ID references (seededData.posts[0].id) rather than creating variables

## Test Structure Requirements

Tests should follow the pattern in `/workspaces/steadystart/apps/graphql/src/resolvers/post/mutations/createPost.test.ts`:

- Use `TestDatabaseOrchestrator` from `@steadystart/tester`
- Use `genqlMutation` or `genqlQuery` helpers for executing GraphQL operations
- Include appropriate test cases for both success and failure scenarios
- Use `toMatchInlineSnapshot()` for assertions (snapshots will be populated when the user runs the tests)
- If there are already existing inline snapshots in the test files, preserve and respect them instead of replacing with empty snapshots
- Do not add DB validation checks after unauthorized errors in tests
- Do NOT include comments in the tests
- Ensure test descriptions clearly explain what each test is verifying
- Do NOT run the tests - the user will run them manually
- Prefer using existing data from seededData instead of creating new entities in tests
- Before using any seededData entity:
  - Check that the entity with the specified index exists in seededData
  - Verify which workspace the entity belongs to for proper authorization testing
  - Check other relevant properties (relations, etc.) needed for the test
- Always reference seededData directly (e.g., seededData.posts[0].id) without declaring intermediate constants
- Follow the single-use variable guideline from TypeScript code guidelines

## Validation Requirements

Before generating tests, validate that:

1. All resolver arguments have corresponding validation schemas
2. All ID parameters are properly checked with auth scopes
3. The resolver handles both success and error cases appropriately

If any issues are found, provide specific recommendations to fix the resolver before proceeding with test creation.
