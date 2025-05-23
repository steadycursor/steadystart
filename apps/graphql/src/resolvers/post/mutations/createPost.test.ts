import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlMutation } from '../../../tests/genqlCall';

test('Should create a post', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      createPost: [
        { title: 'Hello from the other side' }, //
        { __scalar: true, id: false, createdAt: false },
      ],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "createPost": {
        "__typename": "Post",
        "title": "Hello from the other side",
      },
    }
  `);
});

test('Should not create a post when title is too short', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      createPost: [
        { title: 'H' }, //
        { __scalar: true, id: false, createdAt: false },
      ],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
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
