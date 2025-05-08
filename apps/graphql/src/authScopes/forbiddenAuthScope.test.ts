import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { builder } from '../builder';

test('Should block access when set to true', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { forbidden: true },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"Unauthorized"`);
});

test('Should allow access when set to false', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = async () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { forbidden: false },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});