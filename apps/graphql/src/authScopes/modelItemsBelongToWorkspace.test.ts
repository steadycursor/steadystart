import { TestDatabaseOrchestrator, seededData } from '@steadystart/tester';
import { builder } from '../builder';

test('Should work when post belongs to workspace with id argument', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const post = await prisma.post.create({
    data: {
      title: 'Test Post',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = async () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { modelItemsBelongToWorkspace: { id: post.id, model: 'post' } },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should work when posts belong to workspace with ids argument', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const post1 = await prisma.post.create({
    data: {
      title: 'Test Post 1',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Test Post 2',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = async () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { modelItemsBelongToWorkspace: { ids: [post1.id, post2.id], model: 'post' } },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should work when ids array is empty', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const authScopeCheck = async () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { modelItemsBelongToWorkspace: { ids: [], model: 'post' } },
    );

  expect(await authScopeCheck()).toMatchInlineSnapshot(`undefined`);
});

test('Should not work when workspace is null', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const post = await prisma.post.create({
    data: {
      title: 'Test Post',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: null,
      },
      { modelItemsBelongToWorkspace: { id: post.id, model: 'post' } },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"Unauthorized"`);
});

test('Should not work when post does not belong to workspace', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const post = await prisma.post.create({
    data: {
      title: 'Test Post',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const authScopeCheck = () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[1],
      },
      { modelItemsBelongToWorkspace: { id: post.id, model: 'post' } },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"Unauthorized"`);
});

test('Should not work when any post in the list does not belong to workspace', async () => {
  const prisma = await new TestDatabaseOrchestrator().getTestDatabaseWithPrismaClient();

  const post1 = await prisma.post.create({
    data: {
      title: 'Test Post 1',
      workspaceId: seededData.workspaces[0].id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Test Post 2',
      workspaceId: seededData.workspaces[1].id,
    },
  });

  const authScopeCheck = () =>
    builder.runAuthScopes(
      {
        prisma,
        user: seededData.users[0],
        workspace: seededData.workspaces[0],
      },
      { modelItemsBelongToWorkspace: { ids: [post1.id, post2.id], model: 'post' } },
    );

  expect(authScopeCheck()).rejects.toThrowErrorMatchingInlineSnapshot(`"Unauthorized"`);
});
