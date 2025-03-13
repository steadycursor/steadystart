import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../generated/typed-graphql-builder.ts');

let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/export enum (\w+) {([^}]+)}/g, (_match: string, name: string, body: string) => {
  const entries = body
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line)
    .map((line: string) => {
      const match = line.match(/^(\w+)\s*=\s*(["']?\w+["']?)/);
      
return match ? `${match[1]}: ${match[2]}` : null;
    })
    .filter(Boolean)
    .join(',\n  ');

  return `export const ${name} = {\n  ${entries}\n} as const;\n\nexport type ${name} = keyof typeof ${name};`;
});

fs.writeFileSync(filePath, content);
