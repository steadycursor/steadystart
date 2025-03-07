import cors from 'cors';
import express from 'express';
import { secrets } from './secrets';

export const server = express() //
  .use(cors())
  .use(express.json())
  .get('/', (_req, res) => {
    res.send(`Hello! Here is secret value for CLERK_SECRET_KEY: ${secrets.CLERK_SECRET_KEY}`);
  });
