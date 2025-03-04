const fs = require('fs').promises;
const path = require('path');

(async () => {
  const filePath = path.join(__dirname, '../generated/typed-graphql-builder.ts');

  try {
    let content = await fs.readFile(filePath, 'utf-8');

    const newType = `
export type ModelOutput<T> = T extends $Interface<infer Subtypes, any>
  ? { [K in keyof Subtypes]: ModelOutput<Subtypes[K]> }[keyof Subtypes]
  : T extends $Union<infer Subtypes, any>
  ? { [K in keyof Subtypes]: ModelOutput<Subtypes[K]> }[keyof Subtypes]
  : T extends $Base<any>
  ? { [K in keyof T]: ModelOutput<T[K]> }
  : [T] extends [$Field<any, infer FieldType, any>]
  ? FieldType extends null | undefined
    ? FieldType
    : NonNullable<FieldType>
  : [T] extends [(selFn: (arg: infer Inner) => any) => any]
  ? ModelOutput<Inner>
  : [T] extends [(args: any, selFn: (arg: infer Inner) => any) => any]
  ? ModelOutput<Inner>
  : never;
`;

    content += `\n${newType}`;
    await fs.writeFile(filePath, content, 'utf-8');
  } catch (error) {}
})();
