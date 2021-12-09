import express from "express";
import * as ejs from "ejs";
import request from "request"

const router = express.Router();

export const initWebRoutes = (bot)=> {
  const app = bot.app;
  app.use(express.static("./src/public"));
  app.set("view engine", "html");
  app.engine('html', ejs.renderFile);
  app.set("views","./src/webview");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  router.get("/:id/:timestamp", (_req, res) => {
    const current = new Date()
    current.setSeconds(current.getSeconds() - 20);
    // if (Number(_req.params.timestamp) < current.getTime()) {
    //   return;
    // }
    if (_req.params.id == '1') {
      return res.render("account1.html");
    }
    return res.render("account2.html");
  });

  router.get("/confirm/:id/:timestamp", (_req, res) => {
    console.log('________________________', (new Date()).toString());
    console.log('________________________', (new Date()).getTime());
    const current = new Date()
    current.setSeconds(current.getSeconds() - 100);
    console.log('________________________', current.toString());
    console.log('________________________', current.getTime());
    console.log('________________________', new Date(_req.params.timestamp).toString())
    console.log('________________________', _req.params.timestamp);
    if (Number(_req.params.timestamp) < current.getTime()) {
      console.log('___________________________ session timeout');
      return;
    }
    return res.render("confirm.html");
  });

  router.post("/", (_req, res) => {
    const callSendAPI = (sender_psid, response) => {
      const request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      };

      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://graph.facebook.com/v12.0/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, _res) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
      });
    };
    const response = {
      "text": `We have got your change request\nWhat's next?\nWe'll your change will be processed within 1 to 2 business days.\nWe'll notify you by SMS when your loan has been updated.\nThanks for chatting with us! ^_^`
    };
    callSendAPI(_req.body.psid, response);
    if (bot._conversations) {
      bot._conversations[0].end()
    }
    return res.render("agree.html");
  })

  return app.use("/", router);
};
