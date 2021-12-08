import BootBot from 'bootbot';
import { resolveIssueHandler } from '@server/application';
import { ButtonBuilder, persistent_menu } from '@server/buttons';
import { ButtonPayload } from '@server/constants';
import { showEligibleAccounts, viewAccountDetails } from '@server/virtual-assistant';

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
});

bot.setGetStartedButton((_, chat) => {
  chat.say('Hello, How can I help you?');
});

bot.setGreetingText('Hello, I\'m Lisa. I\'m a virtual assistant');

bot.setPersistentMenu(persistent_menu);

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
    quickReplies: [
      {
        content_type: 'text',
        title: 'Red',
        payload: 'HELP_SETTINGS',
        image_url: 'https://www.pngkey.com/png/full/13-137208_red-phone-icon-png-call-red-icon-png.png',
      }, {
        content_type: 'text',
        title: 'Green',
        payload: 'HELP_SETTINGS',
        image_url: 'http://example.com/img/green.png',
      },
    ],
  });
});

bot.hear(['help'], (_payload, chat) => {
  // Send a text message with buttons
  chat.say({
    text: 'What do you need help with?',
    buttons: [
      { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
      { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
      { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' },
      new ButtonBuilder().withPayload(ButtonPayload.ELIGIBLE_ACCOUNTS).withTitle('Show eligible accounts').build(),
    ],
  });
});

bot.hear('image', (_payload, chat) => {
  // Send an attachment
  chat.say({
    attachment: 'image',
    url: 'http://example.com/image.png',
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

bot.on('postback:' + ButtonPayload.ELIGIBLE_ACCOUNTS, (payload, chat) => {
  showEligibleAccounts(payload, chat);
});

bot.on('postback', (payload, chat) => {
  const regViewAccountButton = /VIEW_ACCOUNT_DETAIL:(\d+)/i;
  const buttonPayload = payload.postback.payload;
  const match = buttonPayload.match(regViewAccountButton);

  if (match) {
    const buttonId = match[1];
    viewAccountDetails(payload, chat, buttonId);
  }
});


bot.start(process.env.PORT);
