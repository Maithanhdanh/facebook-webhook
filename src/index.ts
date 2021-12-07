import BootBot from 'bootbot';

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
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
      quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
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


bot.start();
