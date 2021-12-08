import express from "express";

const router = express.Router();

export const initWebRoutes = (app)=> {
  router.get("/", (_req, res) => {
    console.log(__dirname)
    return res.render("test.html");
  });

  return app.use("/", router);
};
