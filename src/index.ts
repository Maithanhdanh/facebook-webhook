import * as moduleAlias from 'module-alias';
const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@controller': `${sourcePath}/controller`,
});

import BootBot from 'bootbot';
import { resolveIssueHandler } from '@server/application';
import { persistent_menu } from '@server/buttons';

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
});

bot.setGetStartedButton((_, chat) => {
  chat.say('Hello, How can I help you?');
});

bot.setGreetingText("Hello, I'm Lisa. I'm a virtual assistant");

bot.setPersistentMenu(persistent_menu);

bot.on('postback:PERSISTENT_MENU_HELP', (_payload, chat) => {
  resolveIssueHandler(chat);
});

bot.hear(
  [
    /([a-zA-Z0-9]* )*issue ([a-zA-Z0-9]* )*loan/i,
    /([a-zA-Z0-9]* )*loan ([a-zA-Z0-9]* )*issue/i,
  ],
  (_payload, chat) => {
    resolveIssueHandler(chat);
  },
);

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
        image_url:
          'https://www.pngkey.com/png/full/13-137208_red-phone-icon-png-call-red-icon-png.png',
      },
      {
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
      convo
        .say(`Got it, your favorite food is ${text}`)
        .then(() => sendSummary(convo));
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

bot.hear('term', (_payload, chat) => {
  // Send an attachment
  chat.say({
    text: 'Below is your available terms?',
    buttons: [
      {
        type: 'postback',
        title: '1 Year - Interest_rate: 2.19% p.a.',
        payload: '1Y',
      },
      {
        type: 'postback',
        title: '2 Years - Interest rate: 2.00% p.a.',
        payload: '2Y',
      },
      {
        type: 'postback',
        title: '3 Years - Interest rate: 2.00% p.a.',
        payload: '3Y',
      },
    ],
  });
});

bot.hear('repayment-change', (_payload, chat) => {
  // Send an attachment
  chat.sendTemplate({
    type: 'template',
    payload: {
      template_type: 'receipt',
      recipient_name: 'Stephane Crozatier',
      order_number: '12345678902',
      currency: 'USD',
      payment_method: 'Visa 2345',
      order_url: 'http://originalcoastclothing.com/order?order_id=123456',
      timestamp: '1428444852',
      address: {
        street_1: '1 Hacker Way',
        street_2: '',
        city: 'Menlo Park',
        postal_code: '94025',
        state: 'CA',
        country: 'US',
      },
      summary: {
        subtotal: 75.0,
        shipping_cost: 4.95,
        total_tax: 6.19,
        total_cost: 56.14,
      },
      adjustments: [
        {
          name: 'New Customer Discount',
          amount: 20,
        },
        {
          name: '$10 Off Coupon',
          amount: 10,
        },
      ],
      elements: [
        {
          title: 'Classic White T-Shirt',
          subtitle: '100% Soft and Luxurious Cotton',
          quantity: 2,
          price: 50,
          currency: 'USD',
          image_url: 'http://originalcoastclothing.com/img/whiteshirt.png',
        },
        {
          title: 'Classic Gray T-Shirt',
          subtitle: '100% Soft and Luxurious Cotton',
          quantity: 1,
          price: 25,
          currency: 'USD',
          image_url: 'http://originalcoastclothing.com/img/grayshirt.png',
        },
      ],
    },
  });
});

bot.start(process.env.PORT);
