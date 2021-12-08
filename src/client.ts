import {createServer} from "@config/express";

const start = async () => {
  const app = await createServer();
  app.listen(3000, () => {
    console.log(`App is running at the port ${3000}`);
  });
}

start();
