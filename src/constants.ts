export const ACCOUNT_ID_1 = '68686868';
export const ACCOUNT_ID_2 = '69696969';

export const ACCOUNT_DETAILS = {
  [ACCOUNT_ID_1]: {
    account: 'Home Loan 1',
    parties: 'Ronaldo, Messi',
    currentBalance: '+$100,000.00',
    interestRate: '3.14',
    endDate: '31 Dec 2022',
  },
  [ACCOUNT_ID_2]: {
    account: 'Home Loan 2',
    parties: 'Angelina Jolie',
    currentBalance: '+$150,000.00',
    interestRate: '4.44',
    endDate: '31 Dec 2022',
  },
};

export enum ButtonPayload {
  ELIGIBLE_ACCOUNTS = 'ELIGIBLE_ACCOUNTS',
  VIEW_ACCOUNT_DETAIL = 'VIEW_ACCOUNT_DETAIL_',
  CONFIRM_PROCESSING_ACCOUNT = 'CONFIRM_PROCESSING_ACCOUNT',
  TALK_TO_BANKER = 'TALK_TO_BANKER'
}

export enum loanModOptions {
  FIX = 'Fix my interest rate',
  REFIX = 'Refix my interest rate',
  SPLIT = 'Split my home loan',
  YES = 'Yes',
  NO = `No, I want to pay more, I'm rich`
}

export enum LoanAmounts {
  TWENTY_THOUSAND = '$20,000',
  FIFTY_THOUSAND = '$50,000',
  ONE_HUNDRED_THOUSAND = '$100,000',
  ONE_HUNDRED_FIFTY_THOUSAND = '$100,000',
}
