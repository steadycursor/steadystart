import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { schema } from '../schema';
import { printSchema, lexicographicSortSchema } from 'graphql';

const schemaAsString = printSchema(lexicographicSortSchema(schema));
const schemaDirectory = path.join(__dirname, '../generated');

mkdirSync(schemaDirectory, { recursive: true });

writeFileSync(path.join(schemaDirectory, 'schema.graphql'), schemaAsString);
