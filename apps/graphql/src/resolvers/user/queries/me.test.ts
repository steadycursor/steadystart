import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlQuery } from '../../../tests/genqlCall';

test('Should return current user data', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      me: { __scalar: true, id: true, locale: true },
    },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "me": {
        "__typename": "Me",
        "id": "8efb256531f14abf84bd",
        "locale": "EN",
      },
    }
  `);

  expect(response.me.id).toBe(seededData.users[0].id);
  expect(response.me.locale).toBe(seededData.users[0].locale);
});

test('Should not return user data when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlQuery({
    prisma,
    source: {
      me: { __scalar: true, id: true, locale: true },
    },
  });

  expect(response).toMatchInlineSnapshot(`
    [ClientError: Not authorized to resolve Query.me
    {
      "message": "Not authorized to resolve Query.me",
      "locations": [
        {
          "line": 1,
          "column": 8
        }
      ],
      "path": [
        "me"
      ]
    }]
  `);
});
