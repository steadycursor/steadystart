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

## Test Structure

Tests should follow the pattern in `/workspaces/relaybrain/apps/graphql/src/resolvers/collection/mutations/createCollection.test.ts`:

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
  - Check other relevant properties (tagNamespaceId, relations, etc.) needed for the test
- Always reference seededData directly (e.g., seededData.tags[0].id) without declaring intermediate constants
- Follow the single-use variable guideline from TypeScript code guidelines

## Validation Requirements

Before generating tests, validate that:

1. All resolver arguments have corresponding validation schemas
2. All ID parameters are properly checked with auth scopes
3. The resolver handles both success and error cases appropriately

If any issues are found, provide specific recommendations to fix the resolver before proceeding with test creation.
