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
        "createPost"
      ]
    }]
  `);
});
