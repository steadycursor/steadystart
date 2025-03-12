import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { errors } from '../lib/errors';

const outputFilePath = './src/generated/errors-for-locale-extraction.ts';

const start = async () => {
  const mappedEnums = [
    `const t = (key: string) => key;`, //
    '',
    `export const errors = [`,
    errors.map((error) => `t("errors:${error}")`).join(',\n'),
    `]`,
    `${os.EOL}${os.EOL}`,
  ].join('\n');

  // Delete file
  await fs.unlink(outputFilePath).catch(() => {});

  // Make sure directories for path exists
  await fs.mkdir(path.resolve(process.cwd(), 'src/generated')).catch(() => {});

  await fs.appendFile(outputFilePath, mappedEnums);
};

start();
