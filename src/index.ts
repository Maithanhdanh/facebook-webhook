import * as moduleAlias from 'module-alias';
const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@controller': `${sourcePath}/controller`,
});

import BootBot from 'bootbot';
import { inputLoanHandler, resolveIssueHandler } from '@server/application';
import { persistent_menu } from '@server/buttons';
import { ACCOUNT_ID_1, ACCOUNT_ID_2, ButtonPayload } from '@server/constants';
import {
  showEligibleAccounts,
  viewAccountDetails,
} from '@server/virtual-assistant';
import { getPostbackPayload } from '@server/utils';
import {
  acceptLoan,
  cancelLoan,
  getSummary,
  getTerm,
  viewTerms,
} from '@server/selectTerm';
import {initWebRoutes} from "@server/routes/web";

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
});


initWebRoutes(bot.app);


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
    /([a-zA-Z0-9]* )*help ([a-zA-Z0-9]* )*loan/i,
    /([a-zA-Z0-9]* )*loan ([a-zA-Z0-9]* )*help/i,
  ],
  (_payload, chat) => {
    resolveIssueHandler(chat);
  },
);

bot.hear('input loan', (_payload, chat) => {
  inputLoanHandler(chat);
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
      // { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
      // { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
      // { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' },
      { type: 'web_url', title: 'Talk to google', url: `${process.env.BASE_URL}/confirm/2/${123}`, webview_height_ratio: 'tall', messenger_extensions: true },
      // new ButtonBuilder().withPayload(ButtonPayload.ELIGIBLE_ACCOUNTS).withTitle('Show eligible accounts').build(),
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

bot.on(getPostbackPayload(ButtonPayload.ELIGIBLE_ACCOUNTS), (payload, chat) => {
  showEligibleAccounts(payload, chat);
});

// bot.on('postback', (payload, chat) => {
//   const regViewAccountButton = /VIEW_ACCOUNT_DETAIL:(\d+)/i;
//   const buttonPayload = payload.postback.payload;
//   const match = buttonPayload.match(regViewAccountButton);
//
//   if (match) {
//     const buttonId = match[1];
//     viewAccountDetails(payload, chat, buttonId);
//   }
// });

bot.on(
  getPostbackPayload(ButtonPayload.VIEW_ACCOUNT_DETAIL + ACCOUNT_ID_1),
  (payload, chat) => {
    viewAccountDetails(payload, chat);
  },
);

bot.on(
  getPostbackPayload(ButtonPayload.VIEW_ACCOUNT_DETAIL + ACCOUNT_ID_2),
  (payload, chat) => {
    viewAccountDetails(payload, chat);
  },
);

bot.on(getPostbackPayload(ButtonPayload.TALK_TO_BANKER), (_payload, chat) => {
  chat.say(
    'In order to help serve you better, Lisa will turn to customer service staff to assist you! Thank you so much!',
  );
});

bot.on(
  getPostbackPayload(ButtonPayload.CONFIRM_PROCESSING_ACCOUNT),
  (_payload, chat) => {
    chat.say('This feature is in dev! Thank you so much!');
  },
);

bot.hear('term', (_payload, chat) => getTerm(_payload, chat));

bot.on(getPostbackPayload(ButtonPayload.SELECT_TERM), (_payload, chat) =>
  getSummary(_payload, chat),
);

bot.on(getPostbackPayload(ButtonPayload.VIEW_TERM), (_payload, chat) =>
  viewTerms(_payload, chat),
);

bot.on(getPostbackPayload(ButtonPayload.ACCEPT_TERM), (_payload, chat) =>
  acceptLoan(_payload, chat),
);

bot.on(getPostbackPayload(ButtonPayload.CANCEL_TERM), (_payload, chat) =>
  cancelLoan(_payload, chat),
);

bot.start(process.env.PORT);
