import { serveExpressServer } from 'express-pretty-listen';
import { server } from './server';

serveExpressServer({ port: 4000, server });
