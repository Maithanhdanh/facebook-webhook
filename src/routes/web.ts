import express from "express";
import * as ejs from "ejs";

const router = express.Router();

export const initWebRoutes = (app)=> {
  app.use(express.static("./src/public"));
  app.set("view engine", "html");
  app.engine('html', ejs.renderFile);
  app.set("views","./src/webview");

  router.get("/", (_req, res) => {
    return res.render("test.html");
  });

  return app.use("/", router);
};
