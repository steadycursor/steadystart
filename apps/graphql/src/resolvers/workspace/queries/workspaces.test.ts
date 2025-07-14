import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should return workspaces for authenticated user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const firstPage = await genqlQuery({
    prisma,
    source: {
      workspaces: [{ filter: { page: 1, size: 1 } }, { __scalar: true, rows: { __scalar: true } }],
    },
    userId: seededData.users[0].id,
  });

  expect(firstPage).toMatchInlineSnapshot(`
    {
      "workspaces": {
        "__typename": "PaginatedWorkspaces",
        "page": 1,
        "rows": [
          {
            "__typename": "Workspace",
            "id": "56bff15d207f41f9b20d",
            "title": "Test Workspace 1",
          },
        ],
        "size": 1,
        "totalSize": 2,
      },
    }
  `);
});

test('Should return all workspaces for authenticated user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const firstPage = await genqlQuery({
    prisma,
    source: {
      workspaces: [{ filter: { page: 1 } }, { __scalar: true, rows: { __scalar: true } }],
    },
    userId: seededData.users[0].id,
  });

  expect(firstPage).toMatchInlineSnapshot(`
    {
      "workspaces": {
        "__typename": "PaginatedWorkspaces",
        "page": 1,
        "rows": [
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
        "size": 100,
        "totalSize": 2,
      },
    }
  `);
});

test('Should return only workspaces where user has membership', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspaces: [{}, { __scalar: true, rows: { __scalar: true } }],
    },
    userId: seededData.users[1].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "workspaces": {
        "__typename": "PaginatedWorkspaces",
        "page": 1,
        "rows": [
          {
            "__typename": "Workspace",
            "id": "56bff15d207f41f9b20d",
            "title": "Test Workspace 1",
          },
        ],
        "size": 100,
        "totalSize": 1,
      },
    }
  `);
});

test('Should not return workspaces when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      workspaces: [{}, { __scalar: true, rows: { __scalar: true } }],
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
