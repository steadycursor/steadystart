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
    [ClientError: [
      {
        "code": "too_small",
        "minimum": 2,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "String must contain at least 2 character(s)",
        "path": [
          "title"
        ]
      }
    ]
    {
      "message": "[\\n  {\\n    \\"code\\": \\"too_small\\",\\n    \\"minimum\\": 2,\\n    \\"type\\": \\"string\\",\\n    \\"inclusive\\": true,\\n    \\"exact\\": false,\\n    \\"message\\": \\"String must contain at least 2 character(s)\\",\\n    \\"path\\": [\\n      \\"title\\"\\n    ]\\n  }\\n]",
      "locations": [
        {
          "line": 1,
          "column": 24
        }
      ],
      "path": [
        "createWorkspace"
      ]
    }]
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
    [ClientError: Not authorized to resolve Mutation.createWorkspace
    {
      "message": "Not authorized to resolve Mutation.createWorkspace",
      "locations": [
        {
          "line": 1,
          "column": 24
        }
      ],
      "path": [
        "createWorkspace"
      ]
    }]
  `);
});
