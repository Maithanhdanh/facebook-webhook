// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { ButtonPayload, homeLoanAccount1, homeLoanAccount2, loanModOptions } from '@server/constants';
import { refixFlowButtons } from '@server/buttons';
import { handleInputLoan } from './inputLoan';

export const resolveIssueHandler = (chat) => {
  const question = {
    text: `Are you looking to save on your monthly loan payments?`,
    quickReplies: [
      {
        content_type: 'text',
        title: loanModOptions.YES,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type: 'text',
        title: loanModOptions.FIX,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type: 'text',
        title: loanModOptions.REFIX,
        // image_url:"https://cdn-icons-png.flaticon.com/512/1900/1900231.png"
      },
      {
        content_type: 'text',
        title: loanModOptions.SPLIT,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      },
      {
        content_type: 'text',
        title: loanModOptions.NO,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      },
    ],
  };
  const askModType = (convo) => {
    convo.ask(question, (payload, convo) => {
      const text = payload.message.text;
      convo.set('modType', text);
      if (text == loanModOptions.FIX) {
        convo.say(`Please select an account which you want to fix an interest rate`).then(() => fixModType(convo));
      } else if (text == loanModOptions.REFIX) {
        convo.say(`Let me check your account`).then(() => refixModType(convo));
      } else if (text == loanModOptions.SPLIT) {
        convo.say(`Let me check your account`).then(() => splitModType(convo));
      } else if (text == loanModOptions.YES || text == loanModOptions.NO) {
        convo.say(`Please select an account which you want to change your home loan`).then(() => getLoanAccount(convo));
      } else {
        convo.end();
      }
    });
  };

  const fixModType = (convo) => {
    const current = new Date().getTime();
    const question = {
      cards: [
        homeLoanAccount1(current),
      ],
    };
    const answer = (payload, convo) => {
      console.log(payload);
      const selected = payload.postback;
      if (!selected || !['HL1'].includes(selected.payload)) {
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

  const refixModType = (convo) => {
    const question = () => (
      convo.sendButtonTemplate(`Sorry, there is no account eligible to be re-fixed. Please try another option`, refixFlowButtons)
    );

    const answer = (payload, convo) => {
      console.log(payload);
      const selected = payload.postback;
      if (!selected) {
        convo.end();
      }

      switch (selected) {
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
          convo.say('End process, Please try again');
          convo.end();
          break;
        }
      }
    };

    convo.ask(question, answer);
  };

  const splitModType = (convo) => {
    const current = new Date().getTime();
    const question = {
      cards: [
        homeLoanAccount2(current),
      ],
    };
    const answer = (payload, convo) => {
      console.log(payload);
      const selected = payload.postback;
      if (!selected || !['HL2'].includes(selected.payload)) {
        convo.say('End process, Please try again');
        convo.end();
      } else {
        convo.say(`You chose Home Loan 2. Let me check`).then(() => handleInputLoan(convo));
      }
    };
    convo.ask(question, answer);
  };

  const talkToBanker = (convo) => {
    convo.say(`'In order to help serve you better, Lisa will turn to customer service staff to assist you! Thank you so much!'`);
    convo.end();
  };

  const noThanks = (convo) => {
    convo.say(`'Bye Bye! Thank you so much!'`);
    convo.end();
  };

  chat.conversation((convo) => {
    askModType(convo);
  });

  const getLoanAccount = (convo) => {
    const current = new Date().getTime();
    const question = {
      cards: [
        homeLoanAccount1(current),
        homeLoanAccount2(current),
      ],
    };
    const answer = (payload, convo) => {
      const selected = payload.postback;
      if (!selected || !['HL1', 'HL2'].includes(selected.payload)) {
        convo.say('End process, Please try again');
        convo.end();
      } else {
        convo.say(`You choose ${selected.payload == 'HL1' ? 'Home Loan 1' : 'Home Loan 2'}, Let me check`).then(() => {
          setTimeout(() => {
            convo.say('There are no eligible account for Loan');
            convo.end();
          }, 2000);
        });
      }
    };
    convo.ask(question, answer);
  };
};
