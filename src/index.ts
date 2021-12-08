import * as moduleAlias from 'module-alias';
import BootBot from 'bootbot';
import { inputLoanHandler, resolveIssueHandler } from '@server/application';
import { persistent_menu } from '@server/buttons';
import { ACCOUNT_ID_1, ACCOUNT_ID_2, ButtonPayload } from '@server/constants';
import {
  showEligibleAccounts,
  viewAccountDetails,
} from '@server/virtual-assistant';
import { getPostbackPayload } from '@server/utils';
import { cancelLoan, getSummary, getTerm } from '@server/selectTerm';

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@controller': `${sourcePath}/controller`,
});

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

bot.hear('input loan', (_payload, chat) => {
  inputLoanHandler(chat);
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

bot.hear(['1Y', '2Y', '3Y'], (_payload, chat) => getSummary(_payload, chat));

bot.hear('CANCEL_LOAN', (_payload, chat) => cancelLoan(_payload, chat));

bot.start(process.env.PORT);
