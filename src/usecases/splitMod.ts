import { homeLoanAccount2 } from '@server/loanAccounts';
import { handleInputLoan } from '@server/usecases/inputLoan';

export const splitModType = (convo) => {
  const current = new Date().getTime();
  const question = {
    cards: [
      homeLoanAccount2(current),
    ],
  };
  const answer = (payload, convo) => {
    console.log(payload);
    const selected = payload.postback;
    if (!selected || !['SELECT_HOME_LOAN_HL2'].includes(selected.payload)) {
      convo.say('End process, Please try again');
      convo.end();
    } else {
      convo.say(`You chose Home Loan 2. Let me check`).then(() => handleInputLoan(convo));
    }
  };
  convo.ask(question, answer);
};
