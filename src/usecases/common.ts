import { homeLoanAccount1, homeLoanAccount2 } from '@server/loanAccounts';

export const noThanks = (convo) => {
  convo.say(`Bye Bye! Thank you so much!`);
  convo.end();
};

export const talkToBanker = (convo) => {
  convo.say(`In order to help serve you better, Lisa will turn to customer service staff to assist you! Thank you so much!`);
  convo.end();
};

export const getLoanAccount = (convo) => {
  const current = new Date().getTime();
  const question = {
    cards: [
      homeLoanAccount1(current),
      homeLoanAccount2(current),
    ],
  };
  const answer = (payload, convo) => {
    const selected = payload.postback;
    if (!selected || !['SELECT_HOME_LOAN_HL1', 'SELECT_HOME_LOAN_HL2'].includes(selected.payload)) {
      convo.say('End process, Please try again');
      convo.end();
    } else {
      convo.say(`You chose ${selected.payload == 'SELECT_HOME_LOAN_HL1' ? 'Home Loan 1' : 'Home Loan 2'}, Let me check`).then(() => {
        setTimeout(() => {
          convo.say('There are no eligible account for Loan');
          convo.end();
        }, 2000);
      });
    }
  };
  convo.ask(question, answer);
};
