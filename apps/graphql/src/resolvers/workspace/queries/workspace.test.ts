import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should return workspace by id', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspace: [{ id: seededData.workspaces[0].id }, { __scalar: true, id: true, title: true }],
    },
    userId: seededData.users[0].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "workspace": {
        "__typename": "Workspace",
        "id": "56bff15d207f41f9b20d",
        "title": "Test Workspace 1",
      },
    }
  `);
});

test('Should not return workspace when user has no access to it', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspace: [{ id: seededData.workspaces[1].id }, { __scalar: true, id: true, title: true }],
    },
    userId: seededData.users[1].id,
    workspaceId: seededData.workspaces[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "NOT_AUTHORIZED",
        },
      ],
    }
  `);
});

test('Should not return workspace when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspace: [{ id: seededData.workspaces[0].id }, { __scalar: true, id: true, title: true }],
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
