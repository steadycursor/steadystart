import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlMutation } from '../../../tests/genqlCall';

test('Should create a workspace', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      createWorkspace: [{ title: 'New Test Workspace' }, { __scalar: true, id: false }],
    },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "createWorkspace": {
        "__typename": "Workspace",
        "title": "New Test Workspace",
      },
    }
  `);
});

test('Should not create a workspace when title is too short', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      createWorkspace: [{ title: 'A' }, { __scalar: true }],
    },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "VALIDATION_ERROR: title - String must contain at least 2 character(s)",
          "validation": {
            "details": {
              "code": "too_small",
              "exact": false,
              "inclusive": true,
              "message": "String must contain at least 2 character(s)",
              "minimum": 2,
              "path": [
                "title",
              ],
              "type": "string",
            },
            "field": "title",
          },
        },
      ],
    }
  `);
});

test('Should not create a workspace when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      createWorkspace: [{ title: 'Unauthorized Workspace' }, { __scalar: true }],
    },
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "USER_NOT_AUTHENTICATED",
        },
      ],
    }
  `);
});
