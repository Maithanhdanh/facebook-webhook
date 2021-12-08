import BootBot from 'bootbot';
import { showEligibleAccounts, viewAccountDetails } from '@server/virtual-assistant';

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
        { type: 'postback', title: 'Show eligible accounts', payload: 'PROCESSING_ACCOUNT_PAYLOAD' },
      ],
    }));
});


bot.on('postback:PROCESSING_ACCOUNT_PAYLOAD', (payload, chat) => {
  showEligibleAccounts(payload, chat);
});

bot.on('postback', (payload, chat) => {
  const regViewAccountButton = /IEW_ACCOUNT_DETAIL_PAYLOAD:(\d+)/i;
  const buttonPayload = payload.postback.payload;
  const match = buttonPayload.match(regViewAccountButton);

  if (match) {
    const buttonId = match[1];
    viewAccountDetails(payload, chat, buttonId);
  }
});

bot.start(process.env.PORT);
