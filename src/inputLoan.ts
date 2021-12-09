import { LoanAmounts } from '@server/constants';

const detailsLoan = (convo, text) => {
  const receiptTemplate = `Loan amount is: ${text}`;
  convo.say(receiptTemplate);
  convo.say({
    cards: [
      {
        title: 'Variable home loan account (existing)',
        subtitle: `Loan amount: ${text}`,
        buttons: [
          {
            type: 'postback',
            title: 'Select',
            payload: 'variable',
          },
        ],
      },
      {
        title: 'Fixed home loan account (new)',
        subtitle: 'Loan amount: +$120,000.00',
        buttons: [
          {
            type: 'postback',
            title: 'Select',
            payload: 'fixed',
          },
        ],
      },
    ],
  });
};

export const handleInputLoan = (convo) => {
    const options = {
      text: `Please input new fixed home loan in $`,
      quickReplies: [
        {
          content_type: 'text',
          title: LoanAmounts.TWENTY_THOUSAND,
        },
        {
          content_type: 'text',
          title: LoanAmounts.FIFTY_THOUSAND,
        },
        {
          content_type: 'text',
          title: LoanAmounts.ONE_HUNDRED_THOUSAND,
        },
        {
          content_type: 'text',
          title: LoanAmounts.ONE_HUNDRED_FIFTY_THOUSAND,
        },
      ],
    };
    convo.ask(options, (payload, convo) => {
      const text = payload.message.text;
      convo.set('amount', text);
      detailsLoan(convo, text);
    });
  };
