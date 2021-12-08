import express from 'express';
import {initWebRoutes} from "../routes/web";
import * as ejs from 'ejs';

const createServer = async (): Promise<express.Application> => {
  const app = express();
  app.use(express.static("./src/public"));
  app.set("view engine", "html");
  app.engine('html', ejs.renderFile);
  app.set("views","./src/webview");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  initWebRoutes(app);

  return app;
};

export { createServer };