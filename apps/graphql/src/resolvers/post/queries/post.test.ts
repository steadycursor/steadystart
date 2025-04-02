import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should get post by ID', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      post: [{ id: seededData.posts[0].id }, { __scalar: true }],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "post": {
        "__typename": "Post",
        "createdAt": 2000-02-15T16:30:00.000Z,
        "id": "31eff82d609d4a7f95e4",
        "title": "First Post",
      },
    }
  `);
});

test('Should not get post with invalid ID', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      post: [{ id: 'invalid-id' }, { __scalar: true }],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "data": null,
      "errors": "[GraphQLError: Not authorized to resolve Query.post]",
    }
  `);
});

test('Should not get post when wrong workspace', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      post: [{ id: seededData.posts[0].id }, { __scalar: true }],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[1].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "data": null,
      "errors": "[GraphQLError: Not authorized to resolve Query.post]",
    }
  `);
});

test('Should not get post when no user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      post: [{ id: seededData.posts[0].id }, { __scalar: true }],
    },
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "data": null,
      "errors": "[GraphQLError: Not authorized to resolve Query.post]",
    }
  `);
});
