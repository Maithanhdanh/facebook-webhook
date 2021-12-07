import BootBot from 'bootbot';

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
});

const buttons = {
  persistent_menu: [
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: "postback",
          title: "Talk to me",
          payload: "BOOTBOT_GET_STARTED"
        },
        {
          type: "postback",
          title: "Help Loan",
          payload: "PERSISTENT_MENU_HELP"
        },
        {
          type: "web_url",
          title: "Support website",
          url: "https://www.google.com/",
          webview_height_ratio: "full"
        }
      ]
    }
  ]
}

bot.setGetStartedButton((_, chat) => {
  chat.say('Hello, How can I help you?');
})

bot.setGreetingText("Hello, I'm Lisa. I'm a virtual assistant");

bot.setPersistentMenu(buttons.persistent_menu);

const resolveIssueHandler = (chat) => {
  const question = {
    text: `What's your Mod Type?`,
    quickReplies:[
      {
        content_type:"text",
        title:"Fix",
        image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type:"text",
        title:"Refix",
        image_url:"https://cdn-icons-png.flaticon.com/512/1900/1900231.png"
      },
      {
        content_type:"text",
        title:"Split",
        image_url:"https://img.icons8.com/ios/452/split-money.png"
      }
    ]
  }
  const askModType = (convo) => {
    convo.ask(question, (payload, convo) => {
      const text = payload.message.text;
      convo.set('modType', text);
      if (text == 'Fix' || text == 'Refix') {
        convo.say(`There are no eligible account for ${text} Loan`);
      } else if (text == 'Split') {
        convo.say(`Let me check your account`).then(() => splitModType(convo));
      } else {
        convo.end();
      }
    });
  };
  const splitModType = (convo) => {
    convo.say(`In develop`);
    convo.end();
  }
  chat.conversation((convo) => {
    askModType(convo);
  });
}

bot.on('postback:PERSISTENT_MENU_HELP', (_payload, chat) => {
  resolveIssueHandler(chat);
});

bot.hear([/([a-zA-Z0-9]* )*issue ([a-zA-Z0-9]* )*loan/i, /([a-zA-Z0-9]* )*loan ([a-zA-Z0-9]* )*issue/i], (_payload, chat) => {
  resolveIssueHandler(chat);
});

bot.hear(['hello', 'hi', /hey( there)?/i], (_payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  chat.say('Hello, human friend!').then(() => {
      chat.say('How are you today?', { typing: true });
  });
});

bot.hear(['food', 'hungry'], (_payload, chat) => {
  // Send a text message with quick replies
  chat.say({
      text: 'What do you want to eat today?',
      // quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
      quickReplies:[
        {
          content_type:"text",
          title:"Red",
          payload:"HELP_SETTINGS",
          image_url:"https://www.pngkey.com/png/full/13-137208_red-phone-icon-png-call-red-icon-png.png"
        },{
          content_type:"text",
          title:"Green",
          payload:"HELP_SETTINGS",
          image_url:"http://example.com/img/green.png"
        }
      ]
  });
});

bot.hear(['help'], (_payload, chat) => {
  // Send a text message with buttons
  chat.say({
      text: 'What do you need help with?',
      buttons: [
          { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
          { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
          { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
      ]
  });
});

bot.hear('image', (_payload, chat) => {
  // Send an attachment
  chat.say({
      attachment: 'image',
      url: 'http://example.com/image.png'
  });
});

bot.hear('ask me something', (_payload, chat) => {

  const askName = (convo) => {
      convo.ask(`What's your name?`, (payload, convo) => {
          const text = payload.message.text;
          convo.set('name', text);
          convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
      });
  };

  const askFavoriteFood = (convo) => {
      convo.ask(`What's your favorite food?`, (payload, convo) => {
          const text = payload.message.text;
          convo.set('food', text);
          convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
      });
  };

  const sendSummary = (convo) => {
      convo.say(`Ok, here's what you told me about you:
        - Name: ${convo.get('name')}
        - Favorite Food: ${convo.get('food')}`);
    convo.end();
  };

  chat.conversation((convo) => {
      askName(convo);
  });
});


bot.start(process.env.PORT);
