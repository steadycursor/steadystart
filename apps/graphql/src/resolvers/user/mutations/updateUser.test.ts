import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { genqlMutation } from '../../../tests/genqlCall';

test('Should update user locale', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      updateUser: [{ locale: 'CS' }, { __scalar: true, id: true, locale: true }],
    },
    userId: seededData.users[0].id,
  });

  expect(response).toMatchInlineSnapshot(`
    {
      "updateUser": {
        "__typename": "Me",
        "id": "8efb256531f14abf84bd",
        "locale": "CS",
      },
    }
  `);
});

test('Should not update user locale when user is not authenticated', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const response = await genqlMutation({
    prisma,
    source: {
      updateUser: [{ locale: 'CS' }, { __scalar: true, id: true, locale: true }],
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
