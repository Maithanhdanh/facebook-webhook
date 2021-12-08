import BootBot from 'bootbot';
import { showEligibleAccounts, viewAccountDetails } from '@server/virtual-assistant';
import { ButtonPayload } from '@server/constants';
import { ButtonBuilder } from '@server/buttons';

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
});

bot.setGetStartedButton((_payload, chat) => {
  const welcome = `Hey there, I can help you about your loan?`;
  const options = {
    typing: true,
  };

  chat.say(welcome, options)
    .then(() => chat.say({
      text: 'What do you need help with?',
      buttons: [
        new ButtonBuilder().withPayload(ButtonPayload.ELIGIBLE_ACCOUNTS).withTitle('Show eligible accounts').build(),
      ],
    }));
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
