import * as prisma from '@steadysass/prisma';
import * as customEnums from '../src/enums';

export const enums = [
  // custom enums
  ...Object.keys(customEnums).map((key) => ({
    namespace: key,
    // @ts-ignore
    values: Object.keys(customEnums[key]),
  })),
  // prisma enums
  ...Object.keys(prisma)
    .map((key) => ({
      namespace: key,
      // @ts-ignore
      values: Object.keys(prisma[key]),
    }))
    .filter((key: { namespace: string; values: string[] }) => {
      if (key.values.length === 0) {
        return false;
      }

      if (key.namespace.includes('FieldEnum')) {
        return false;
      }

      return ![
        'Prisma',
        'prismaVersion',
        'Decimal',
        'empty',
        'SortOrder',
        'queryMode',
        'dmmf',
        'ModelName',
        'QueryMode',
        'JsonNullValueFilter',
        'NullableJsonNullValueInput',
        'NullsOrder',
        'NullTypes',
        'TransactionIsolationLevel',
        'JsonNullValueInput',
      ].includes(key.namespace);
    }),
];
