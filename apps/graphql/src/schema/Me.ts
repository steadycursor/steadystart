import { builder } from '../builder';
import { Locale } from './Locale';

export const Me = builder.simpleObject('Me', {
  fields: (t) => ({
    id: t.field({ type: 'ID' }),
    locale: t.field({ type: Locale }),
  }),
});
