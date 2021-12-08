import { confirmAccountButtons, getViewAccountDetailsButton } from '@server/buttons';
import { ACCOUNT_DETAILS, ACCOUNT_ID_1, ACCOUNT_ID_2 } from '@server/constants';

export const showEligibleAccounts = (_payload, chat) => {
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

  chat.say('Please select your loan account that you want to modify', options)
    .then(() => chat.sendGenericTemplate(eligibleAccounts, options));
};

export const viewAccountDetails = (_payload, chat) => {
  const accountId = _payload.postback.payload.split('.', 2)[1];

  console.log({ accountId });

  const accountDetails = ACCOUNT_DETAILS[accountId];

  const options = {
    typing: true,
  };

  chat.say('Ok, here your Loan account details', options)
    .then(() => chat.sendGenericTemplate([
      {
        'title': 'Account Name',
        'image_url': 'https://3.pik.vn/2021e6ddc94a-4465-41fe-ae5b-648e19a5f30d.png',
        'subtitle': accountDetails.account,
      },
      {
        'title': 'Parties on Loan',
        'image_url': 'https://3.pik.vn/2021236a5a10-2e04-486c-a9e1-0eac5ff040a1.png',
        'subtitle': accountDetails.parties,
      },
      {
        'title': 'Current balance',
        'image_url': 'https://3.pik.vn/2021939a8e17-b694-488d-91eb-bc98d7656726.png',
        'subtitle': accountDetails.currentBalance,
      },
      {
        'title': 'Current interest rate',
        'image_url': 'https://3.pik.vn/202152a8342b-3539-43b9-bd80-1fa8a6d6f57c.png',
        'subtitle': accountDetails.interestRate,
      },
      {
        'title': 'Loan end date',
        'image_url': 'https://2.pik.vn/2021282a709c-68fc-46b4-9ce8-0a0d0df7db1f.png',
        'subtitle': accountDetails.endDate,
      },
    ], { ...options, imageAspectRatio: 'square' })
      .then(() => chat.sendButtonTemplate(`Please confirm these information about Loan account`, confirmAccountButtons)));
};
