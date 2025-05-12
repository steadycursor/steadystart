import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { builder } from '../builder';
import { createContextForAuthScopeTest } from '../utils/createContextForAuthScopeTest';

test('Should block access when set to true', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      }),
      { forbidden: true },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"FORBIDDEN_ACTION"`);
});

test('Should allow access when set to false', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = async () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      }),
      { forbidden: false },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});
