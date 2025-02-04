import { IncomingMessage } from 'http';
import { PartialDeep } from 'type-fest';

type CustomHeaders = Headers & {
  get(name: 'authorization' | 'account' | 'hostnamewithport'): string | null;
};

export type Request = PartialDeep<IncomingMessage> & {
  headers: CustomHeaders & {
    authorization?: string;
    account?: string;
  };
};
