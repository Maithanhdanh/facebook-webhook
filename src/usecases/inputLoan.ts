import { selectHomeLoanDetailButton } from '@server/buttons';
import { ButtonPayload, LoanAmounts } from '@server/constants';
import { getTerm } from '@server/usecases/selectTerm';

const detailsLoan = (convo, text) => {
  const receiptTemplate = `Loan amount is: ${text}`;

  convo.say(receiptTemplate);

  const question = {
    cards: [
      {
        title: 'Variable home loan account (existing)',
        subtitle: `Loan amount: ${text}`,
        buttons: [selectHomeLoanDetailButton],
      },
      {
        title: 'Fixed home loan account (new)',
        subtitle: 'Loan amount: +$120,000.00',
        buttons: [selectHomeLoanDetailButton],
      },
    ],
  };

  const answer = (payload, convo) => {
    const selected = payload.postback;
    if (
      !selected ||
      ![ButtonPayload.SELECT_HOME_LOAN_DETAILS].includes(selected.payload)
    ) {
      convo.say('End process, Please try again');
      convo.end();
    } else {
      convo.say(`Please select your term`).then(() => getTerm(convo));
    }
  };

  convo.ask(question, answer);
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
