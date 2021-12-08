import { selectTermButton } from './buttons';

const options = {
  typing: true,
};

const getTerm = (_payload, chat) => {
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

  chat
    .say(
      `You are currently paying
      Minimum monthly payment: $1,353.33
      Frequency: Monthly
      Interest rate: 4.64% p.a.
      Interest Type: Principal and Interest
      Current balance: $300,000.00
    `,
      options,
    )
    .then(() => chat.say({ cards }, options));
};

const getSummary = (_payload, chat) => {
  chat
    .say(
      `You fixed home loan account (new)
      Loan amount: $120,000.00
      Estimated repayment: $646.83/month
      Interest rate: 2.00% p.a.
    `,
      options,
    )
    .then(() =>
      chat.say(
        {
          elements: [
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
          buttons: [
            {
              type: 'postback',
              title: 'View terms of my home loan',
              payload: 'VIEW_TERM',
            },
            {
              type: 'postback',
              title: 'Agree and submit',
              payload: 'SUBMIT',
            },
            {
              type: 'postback',
              title: 'not agree and cancel',
              payload: 'CANCEL_LOAN',
            },
          ],
        },
        options,
      ),
    );
};

const cancelLoan = (_payload, chat) => {
  chat.say(`Bye, Bye!`, options);
};

export { cancelLoan, getSummary, getTerm };
