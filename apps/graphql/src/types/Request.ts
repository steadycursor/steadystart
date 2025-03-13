import { IncomingMessage } from 'http';
import { PartialDeep } from 'type-fest';

type CustomHeaders = Headers & {
  get(name: 'authorization' | 'workspace' | 'hostnamewithport'): string | null;
};

export type Request = PartialDeep<IncomingMessage> & {
  headers: CustomHeaders & {
    authorization?: string;
    workspace?: string;
  };
};
