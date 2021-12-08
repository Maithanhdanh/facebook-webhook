import { confirmAccountButtons, getViewAccountDetailsButton } from '@server/buttons';
import { ACCOUNT_DETAILS, ACCOUNT_ID_1, ACCOUNT_ID_2 } from '@server/constants';

export const showEligibleAccounts = (_payload, chat) => {
  chat.say('Please select your loan account that you want to modify', {
    typing: true,
  });

  const viewAccount1DetailsButton = getViewAccountDetailsButton(ACCOUNT_ID_1);
  const viewAccount2DetailsButton = getViewAccountDetailsButton(ACCOUNT_ID_2);

  const eligibleAccounts = [{
    title: `Home loan 1`,
    subtitle: `BSB: xxx-123 - AccountNo: xxxxxxx68 - Balance: +$100,000.00`,
    image_url: 'https://3.pik.vn/2021fe85cdf1-792a-4dae-9317-1636a4424ef7.png',
    buttons: [
      viewAccount1DetailsButton,
    ],
  }, {
    title: `Home loan 2`,
    subtitle: `BSB: xxx-456 - AccountNo: xxxxxxx69 - Balance: +$150,000.00`,
    image_url: 'https://3.pik.vn/20216a22d618-dbc3-4d92-b83e-53ce9855969f.png',
    buttons: [
      viewAccount2DetailsButton,
    ],
  }];

  const options = {
    typing: true,
  };

  chat.sendGenericTemplate(eligibleAccounts, options);
};

export const viewAccountDetails = (_payload, chat) => {
  const accountId = _payload.postback.payload.split('.', 2)[1];

  console.log({ accountId });

  const accountDetails = ACCOUNT_DETAILS[accountId];

  const options = {
    typing: true,
  };

  chat.say('Ok, here your Loan account details', options);

  chat.sendListTemplate([{
    'title': 'Account Name',
    'image_url': 'https://d2z4fd79oscvvx.cloudfront.net/0023640_black_forest_cake.jpeg',
    'subtitle': accountDetails.account,
  },
    {
      'title': 'Parties on Loan',
      'image_url': 'http://trivandrumcakehouse.com/wp-content/uploads/2015/10/cake-white-forest.jpg',
      'subtitle': accountDetails.parties,
    },
    {
      'title': 'Current balance',
      'image_url': 'http://img.taste.com.au/NKPhrv0q/taste/2016/11/foolproof-sponge-102144-1.jpeg',
      'subtitle': accountDetails.currentBalance,
    },
    {
      'title': 'Current interest rate',
      'image_url': 'http://www.eatlivetravelwrite.com/wp-content/uploads/2016/01/Homemade-frog-cake-on-eatlivetravelwrite.com_.jpg',
      'subtitle': accountDetails.interestRate,
    },
    {
      'title': 'Current interest rate',
      'image_url': 'http://www.eatlivetravelwrite.com/wp-content/uploads/2016/01/Homemade-frog-cake-on-eatlivetravelwrite.com_.jpg',
      'subtitle': accountDetails.interestRate,
    },
  ], [], options);

  chat.sendButtonTemplate(`Please confirm these information about Loan account`, confirmAccountButtons);
};
