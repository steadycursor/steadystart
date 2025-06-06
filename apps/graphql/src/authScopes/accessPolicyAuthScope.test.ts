import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { builder } from '../builder';
import { createContextForAuthScopeTest } from '../utils/createContextForAuthScopeTest';

test('Should work when valid user', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({ prisma, user: seededData.users[0], workspace: null }), //
      { accessPolicy: 'authenticated' },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should not work when user null', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({ prisma, user: null, workspace: null }), //
      { accessPolicy: 'authenticated' },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"USER_NOT_AUTHENTICATED"`);
});
