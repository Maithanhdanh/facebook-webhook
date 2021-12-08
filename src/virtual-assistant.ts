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
    image_url: 'https://drive.google.com/file/d/16C2HNQuRVvUozcdK0dmrfZUjCCsVxAJN/view?usp=sharing',
    buttons: [
      viewAccount1DetailsButton,
    ],
  }, {
    title: `Home loan 2`,
    subtitle: `BSB: xxx-456 - AccountNo: xxxxxxx69 - Balance: +$150,000.00`,
    image_url: 'https://drive.google.com/file/d/1vli0U2_kA2Pni-_bZ4oKzDXL3hQY8RUO/view?usp=sharing',
    buttons: [
      viewAccount2DetailsButton,
    ],
  }];

  const options = {
    typing: true,
  };

  chat.conversation((convo) => {
    convo.sendGenericTemplate(eligibleAccounts, options);
  });
};

export const viewAccountDetails = (_payload, chat) => {
  const accountId = _payload.postback.payload.split(':', 2)[1];

  const accountDetails = ACCOUNT_DETAILS[accountId];

  const sendAccountDetails = (convo) => {
    convo.say(`Ok, here your Loan account details:
        - Account Name: ${accountDetails.account}
        - Parties on Loan: ${accountDetails.parties}
        - Current balance: ${accountDetails.currentBalance}
        - Current interest rate: ${accountDetails.interestRate}
        - Loan end date: ${accountDetails.endDate}`,
    ).then(() => askConfirmAccount(convo));
  };

  const askConfirmAccount = (convo) => {
    convo.sendButtonTemplate(`Please confirm these information about Loan account`, confirmAccountButtons);
  };

  chat.conversation((convo) => {
    sendAccountDetails(convo);
  });
};
