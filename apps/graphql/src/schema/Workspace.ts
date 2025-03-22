import { Prisma } from '@steadystart/prisma';
import { builder } from '../builder';
import { Context } from '../context';

export const includeOnWorkspace = {} satisfies Prisma.WorkspaceInclude;

export const Workspace = builder.loadableObject('Workspace', {
  load: (ids: string[], context: Context) => context.prisma.workspace.findMany({ where: { id: { in: ids } }, include: includeOnWorkspace }),
  sort: (workspace) => workspace.id,
});

builder.objectType(Workspace, {
  fields: (t) => ({
    id: t.expose('id', { type: 'ID' }),
    title: t.expose('title', { type: 'String' }),
  }),
});
