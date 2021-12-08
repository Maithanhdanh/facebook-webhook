// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {LoanAmounts, loanModOptions} from "@server/constants";

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
      if (text == loanModOptions.FIX || text == loanModOptions.REFIX) {
        convo.say(`There are no eligible account for Loan`);
      } else if (text == loanModOptions.SPLIT) {
        convo.say(`Let me check your account`).then(() => splitModType(convo));
      } else if (text == loanModOptions.YES || text == loanModOptions.NO) {
        convo.then(() => getLoanAccount(convo));
      } else {
        convo.end();
      }
    });
  };
  const splitModType = (convo) => {
    convo.say(`In develop`);
    convo.end();
  }
  chat.conversation((convo) => {
    askModType(convo);
  });

  const getLoanAccount = (convo) => {
    convo.say({
      cards: [
        {
          title: '1 Year',
          image_url:
            'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
          subtitle: 'Interest rate: 2.19% p.a.',
          buttons: [
            {
              type: 'postback',
              title: 'Select',
              payload: '1Y',
            },
          ],
        },
        {
          title: '2 Years',
          image_url:
            'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
          subtitle: 'Interest rate: 2.00% p.a.',
          buttons: [
            {
              type: 'postback',
              title: 'Select',
              payload: '2Y',
            },
          ],
        },
        {
          title: '3 Years',
          image_url:
            'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-colorful-home-loan-icon--coin-symbol-with-house-sign-png-image_1657194.jpg',
          subtitle: 'Interest rate: 2.00% p.a.',
          buttons: [
            {
              type: 'postback',
              title: 'Select',
              payload: '3Y',
            },
          ],
        },
      ],
    });

    convo.end();
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
