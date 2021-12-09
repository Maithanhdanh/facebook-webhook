// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { LoanModOptions } from '@server/constants';
import { getLoanAccount } from '@server/usecases/common';
import { refixModType } from '@server/usecases/refixMod';
import { splitModType } from '@server/usecases/splitMod';
import { fixModType } from '@server/usecases/fixMod';

export const resolveIssueHandler = (chat) => {
  const question = {
    text: `Are you looking to save on your monthly loan payments?`,
    quickReplies: [
      {
        content_type: 'text',
        title: LoanModOptions.YES,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type: 'text',
        title: LoanModOptions.FIX,
        // image_url:"https://cdn4.iconfinder.com/data/icons/loan-debt/64/Fixed_Interest_Rate-512.png"
      },
      {
        content_type: 'text',
        title: LoanModOptions.REFIX,
        // image_url:"https://cdn-icons-png.flaticon.com/512/1900/1900231.png"
      },
      {
        content_type: 'text',
        title: LoanModOptions.SPLIT,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      },
      {
        content_type: 'text',
        title: LoanModOptions.NO,
        // image_url:"https://img.icons8.com/ios/452/split-money.png"
      },
    ],
  };
  const askModType = (convo) => {
    convo.ask(question, (payload, convo) => {
      const text = payload.message.text;
      convo.set('modType', text);
      if (text == LoanModOptions.FIX) {
        convo.say(`Please select an account which you want to fix an interest rate`).then(() => fixModType(convo));
      } else if (text == LoanModOptions.REFIX) {
        convo.say(`Let me check your account`).then(() => refixModType(convo));
      } else if (text == LoanModOptions.SPLIT) {
        convo.say(`Let me check your account`).then(() => splitModType(convo));
      } else if (text == LoanModOptions.YES || text == LoanModOptions.NO) {
        convo.say(`Please select an account which you want to change your home loan`).then(() => getLoanAccount(convo));
      } else {
        convo.end();
      }
    });
  };

  chat.conversation((convo) => {
    askModType(convo);
  });
};
