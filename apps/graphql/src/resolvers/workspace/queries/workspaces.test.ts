import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should return workspaces for authenticated user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspaces: { __scalar: true, id: true, title: true },
    },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "workspaces": [
        {
          "__typename": "Workspace",
          "id": "56bff15d207f41f9b20d",
          "title": "Test Workspace 1",
        },
        {
          "__typename": "Workspace",
          "id": "c4ff8234d86d4f2b9321",
          "title": "Test Workspace 2",
        },
      ],
    }
  `);
});

test('Should return only workspaces where user has membership', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspaces: { __scalar: true, id: true, title: true },
    },
    userId: seededData.users[1].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "workspaces": [
        {
          "__typename": "Workspace",
          "id": "56bff15d207f41f9b20d",
          "title": "Test Workspace 1",
        },
      ],
    }
  `);
});

test('Should not return workspaces when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspaces: { __scalar: true, id: true, title: true },
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
