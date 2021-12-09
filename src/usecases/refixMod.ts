import { refixFlowButtons } from '@server/buttons';
import { ButtonPayload } from '@server/constants';
import { getLoanAccount, noThanks, talkToBanker } from '@server/usecases/common';

export const refixModType = (convo) => {

  const question = (convo) => (
    convo.sendButtonTemplate('Sorry, there is no account eligible to be re-fixed. Please try another option', refixFlowButtons)
  );

  const answer = (payload, convo) => {
    console.log(payload);
    const selected = payload.postback;
    if (!selected) {
      convo.end();
    }

    switch (selected.payload) {
      case ButtonPayload.VIEW_ALL_ACCOUNTS: {
        convo.say(`Let me check your Loan accounts`)
          .then(() => getLoanAccount(convo));
        break;
      }
      case ButtonPayload.TALK_TO_BANKER: {
        talkToBanker(convo);
        break;
      }
      case ButtonPayload.NO_THANKS: {
        noThanks(convo);
        break;
      }
      default: {
        convo.say('End process, Please try again!');
        convo.end();
        break;
      }
    }
  };

  convo.ask(question, answer);
};
