// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {homeloan1, homeloan2, LoanAmounts, loanModOptions} from "@server/constants";

export const resolveIssueHandler = (chat) => {
  const question = {
    text: `Are you looking to save on your monthly loan payments?`,
    quickReplies:[
      {
        content_type:"text",
        title:loanModOptions.YES,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type:"text",
        title:loanModOptions.FIX,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type:"text",
        title:loanModOptions.REFIX,
        // image_url:"https://cdn-icons-png.flaticon.com/512/1900/1900231.png"
      },
      {
        content_type:"text",
        title:loanModOptions.SPLIT,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      },
      {
        content_type:"text",
        title:loanModOptions.NO,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      }
    ]
  }
  const askModType = (convo) => {
    convo.ask(question, (payload, convo) => {
      const text = payload.message.text;
      convo.set('modType', text);
      if (text == loanModOptions.FIX) {
        convo.say(`Please select an account which you want to fix an interest rate`).then(() => fixModType(convo));
      } else if (text == loanModOptions.REFIX) {
        convo.say(`Let me check your account`).then(() => refixModType(convo));
      }else if (text == loanModOptions.SPLIT) {
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
        homeloan1(current)
      ],
    };
    const answer = (payload, convo) => {
      console.log(payload);
      convo.end()
    }
    convo.ask(question, answer);
  }

  const refixModType = (convo) => {
    const current = new Date().getTime();
    const question = {
      cards: [
        homeloan1(current)
      ],
    };
    const answer = (payload, convo) => {
      console.log(payload);
      convo.end()
    }
    convo.ask(question, answer);
  }

  const splitModType = (convo) => {
    convo.say(`In develop`);
    convo.end();
  }
  chat.conversation((convo) => {
    askModType(convo);
  });

  const getLoanAccount = (convo) => {
    console.log(convo)
    const current = new Date().getTime();
    const question = {
      cards: [
        homeloan1(current),
        homeloan2(current)
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
        })
      }
    };
    convo.ask(question, answer);
  }
}

export const inputLoanHandler = (chat) => {
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
  const askInputLoan = (convo) => {
    convo.ask(options, (payload, convo) => {
      const text = payload.message.text;
      convo.set('amount', text);
      detailsLoan(convo, text);
    });
  };

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
    convo.end();
  };

  chat.conversation((convo) => {
    askInputLoan(convo);
  });
};
