import express from "express";
import * as ejs from "ejs";

const router = express.Router();

export const initWebRoutes = (app)=> {
  app.use(express.static("./src/public"));
  app.set("view engine", "html");
  app.engine('html', ejs.renderFile);
  app.set("views","./src/webview");

  router.get("/:id/:timestamp", (_req, res) => {
    const current = new Date()
    current.setSeconds(current.getSeconds() - 20);
    if (Number(_req.params.timestamp) < current.getTime()) {
      return;
    }
    if (_req.params.id == '1') {
      return res.render("account1.html");
    }
    return res.render("account2.html");
  });

  router.get("/confirm/:id/:timestamp", (_req, res) => {
    const current = new Date()
    current.setSeconds(current.getSeconds() - 20);
    // if (Number(_req.params.timestamp) < current.getTime()) {
    //   return;
    // }
    return res.render("confirm.html");
  });

  router.post("/", () => {
    console.log('______________________________________')
  })

  return app.use("/", router);
};
