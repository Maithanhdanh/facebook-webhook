export const ACCOUNT_ID_1 = '68686868';
export const ACCOUNT_ID_2 = '69696969';

export const ACCOUNT_DETAILS = {
  [ACCOUNT_ID_1]: {
    account: 'Home Loan 1',
    parties: 'Ronaldo, Messi',
    interestRate: '3.14',
    endDate: '31 Dec 2022',
  },
  [ACCOUNT_ID_2]: {
    account: 'Home Loan 2',
    parties: 'Angelina Jolie',
    interestRate: '4.44',
    endDate: '31 Dec 2022',
  },
};

export enum ButtonPayload {
  ELIGIBLE_ACCOUNTS = 'ELIGIBLE_ACCOUNTS',
  VIEW_ACCOUNT_DETAIL = 'VIEW_ACCOUNT_DETAIL',
  CONFIRM_PROCESSING_ACCOUNT = 'CONFIRM_PROCESSING_ACCOUNT',
  TALK_TO_BANKER = 'TALK_TO_BANKER'
}
