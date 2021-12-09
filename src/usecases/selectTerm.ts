import { confirmLoanButtons, selectTermButton } from '@server/buttons';
import { ButtonPayload } from '@server/constants';

const options = {
  typing: true,
};

const getTerm = (convo) => {
  const cards = [
    {
      title: '1 Year',
      image_url:
        'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
      subtitle: 'Interest rate: 2.19% p.a.',
      buttons: [selectTermButton],
    },
    {
      title: '2 Years',
      image_url:
        'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
      subtitle: 'Interest rate: 2.00% p.a.',
      buttons: [selectTermButton],
    },
    {
      title: '3 Years',
      image_url:
        'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
      subtitle: 'Interest rate: 2.00% p.a.',
      buttons: [selectTermButton],
    },
  ];

  const answer = (payload, convo) => {
    const selected = payload.postback;
    if (!selected || ![ButtonPayload.SELECT_TERM].includes(selected.payload)) {
      convo.say('End process, Please try again');
      convo.end();
    } else {
      convo.say().then(() => getSummary(convo));
    }
  };

  convo
    .say(
      `You are currently paying
      - Minimum monthly payment: $1,353.33
      - Frequency: Monthly
      - Interest rate: 4.64% p.a.
      - Interest Type: Principal and Interest
      - Current balance: $300,000.00
    `,
      options,
    )
    .then(() => convo.ask({ cards }, answer));
};

const answerLoan = (payload, convo) => {
  const selected = payload.postback;

  switch (selected) {
    case ButtonPayload.VIEW_TERM:
      getTerm(convo);
      break;
    case ButtonPayload.ACCEPT_TERM:
      acceptLoan(payload, convo);
      break;
    case ButtonPayload.CANCEL_TERM:
      cancelLoan(payload, convo);
      break;
    default:
      break;
  }
};

const getSummary = (convo) => {
  convo
    .say(
      `You fixed home loan account (new)
      Loan amount: $120,000.00
      Estimated repayment: $646.83/month
      Interest rate: 2.00% p.a.
    `,
      options,
    )
    .then(() =>
      convo.sendGenericTemplate(
        [
          {
            title: '$1,353.33/month',
            subtitle: 'Your previous minimum repayment was',
          },
          {
            title: '$1,290.63/month',
            subtitle: `You'll need to pay an estimated`,
          },
          {
            title: '$62.70 less per month',
            subtitle: 'Your total repayments are estimated to be',
          },
        ],
        options,
      ),
    )
    .then(() => convo.sendButtonTemplate(`Are you ready to go?`, options))
    .then(() => convo.ask(confirmLoanButtons, answerLoan));
};

const viewTerms = (_payload, chat) => {
  chat.say(`selected terms!`, options);
};

const acceptLoan = (_payload, chat) => {
  chat.say(`Yeah!`, options);
};

const cancelLoan = (_payload, chat) => {
  chat.say(`Bye, Bye!`, options);
};

export { cancelLoan, getSummary, getTerm, viewTerms, acceptLoan };
