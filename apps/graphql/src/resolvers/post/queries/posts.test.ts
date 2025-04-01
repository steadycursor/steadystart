import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should get all workspace posts', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: { posts: { __scalar: true } },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "posts": [
        {
          "__typename": "Post",
          "createdAt": 2000-02-15T16:30:00.000Z,
          "id": "31eff82d609d4a7f95e4",
          "title": "First Post",
        },
        {
          "__typename": "Post",
          "createdAt": 2000-02-15T16:30:00.000Z,
          "id": "7ab34c9d871e42f0a265",
          "title": "Second Post",
        },
      ],
    }
  `);
});

test('Should get not posts when no workspace', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: { posts: { __scalar: true } },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "data": null,
      "errors": "[GraphQLError: Not authorized to resolve Query.posts]",
    }
  `);
});

test('Should get not posts when workspace, but no user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: { posts: { __scalar: true } },
    workspaceId: seededData.workspaces[1].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "data": null,
      "errors": "[GraphQLError: Not authorized to resolve Query.posts]",
    }
  `);
});
