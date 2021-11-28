import express from 'express';
import webhookRouter from '@controller/router'

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.use('/',webhookRouter)

  return app;
};

export { createServer };
