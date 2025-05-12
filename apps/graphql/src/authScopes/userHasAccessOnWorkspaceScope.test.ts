import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { builder } from '../builder';
import { createContextForAuthScopeTest } from '../utils/createContextForAuthScopeTest';

test('Should work when user has access to workspace with true argument', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  await prisma.membership.deleteMany();

  await prisma.membership.create({
    data: {
      userId: seededData.users[0].id,
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      }),
      { userHasAccessOnWorkspace: true },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should work when user has access to workspace with id argument', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  await prisma.membership.deleteMany();

  await prisma.membership.create({
    data: {
      userId: seededData.users[0].id,
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: null,
      }),
      { userHasAccessOnWorkspace: { id: seededData.workspaces[0].id } },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should not work when user is null', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: null,
        workspace: seededData.workspaces[0],
      }),
      { userHasAccessOnWorkspace: true },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"USER_NOT_FOUND"`);
});

test('Should not work when workspace is null with true argument', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: null,
      }),
      { userHasAccessOnWorkspace: true },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"VALID_WORKSPACE_NOT_FOUND_IN_HEADERS"`);
});

test('Should not work when membership does not exist', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  await prisma.membership.deleteMany();

  const authScopeCheck = () =>
    builder.runAuthScopes(
      createContextForAuthScopeTest({
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      }),
      { userHasAccessOnWorkspace: true },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"USER_NOT_FOUND"`);
});
