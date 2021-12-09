import { homeLoanAccount1 } from '@server/loanAccounts';

export const fixModType = (convo) => {
  const current = new Date().getTime();
  const question = {
    cards: [
      homeLoanAccount1(current),
    ],
  };
  const answer = (payload, convo) => {
    console.log(payload);
    const selected = payload.postback;
    if (!selected || !['SELECT_HOME_LOAN_HL1'].includes(selected.payload)) {
      convo.say('End process, Please try again');
      convo.end();
    } else {
      convo.say(`You chose Home Loan 1. Let me check`).then(() => {
        setTimeout(() => {
          convo.say('You\'re eligible to fix your Home Loan 1');
          convo.end();
        }, 2000);
      });
    }
  };
  convo.ask(question, answer);
};
