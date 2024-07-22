import { IncomingMessage } from 'http';
import { PartialDeep } from 'type-fest';

export type Request = PartialDeep<IncomingMessage> & {
  headers: { authorization?: string; account?: string; hostnamewithport?: string };
};
