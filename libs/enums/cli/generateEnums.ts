import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { enums } from './enums';

const enumsFile = './src/generated/enums.ts';
const dataFile = './src/generated/enums.json';

const deleteFile = async (file: string) => fs.unlink(file).catch(() => {});

const start = async () => {
  const mappedEnums = enums.map((item) =>
    [
      `export const ${item.namespace} = {`, //
      item.values.map((item) => `"${item}": "${item}"`).join(', '),
      `} as const;`,
      `export type ${item.namespace} = typeof ${item.namespace}[keyof typeof ${item.namespace}]`,
      `${os.EOL}${os.EOL}`,
    ].join(''),
  );

  await deleteFile(enumsFile);
  await deleteFile(dataFile);

  await fs.mkdir(path.resolve(process.cwd(), 'src/generated')).catch(() => {});

  await fs.appendFile(enumsFile, mappedEnums.join(''));
  await fs.appendFile(dataFile, JSON.stringify(enums, null, 2));
};

start();
