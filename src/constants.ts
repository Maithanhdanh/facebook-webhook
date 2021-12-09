import { selectHomeLoanButton } from './buttons';

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
  VIEW_ACCOUNT_DETAIL = 'VIEW_ACCOUNT_DETAIL.',
  CONFIRM_PROCESSING_ACCOUNT = 'CONFIRM_PROCESSING_ACCOUNT',
  TALK_TO_BANKER = 'TALK_TO_BANKER',
  SELECT_TERM = 'SELECT_TERM',
  VIEW_TERM = 'VIEW_TERM',
  ACCEPT_TERM = 'ACCEPT_TERM',
  CANCEL_TERM = 'CANCEL_TERM',
  VARIABLE_HOME_LOAN = 'VARIABLE_HOME_LOAN',
  FIXED_HOME_LOAN = 'FIXED_HOME_LOAN',
  SELECT_HOME_LOAN = 'SELECT_HOME_LOAN',
  NO_THANKS = 'NO_THANKS',
  VIEW_ALL_ACCOUNTS = 'VIEW_ALL_ACCOUNTS'
}

export enum loanModOptions {
  FIX = 'Fix my interest rate',
  REFIX = 'Refix my interest rate',
  SPLIT = 'Split my home loan',
  YES = 'Yes',
  NO = `No, I'm rich`,
}

export enum LoanAmounts {
  TWENTY_THOUSAND = '$20,000',
  FIFTY_THOUSAND = '$50,000',
  ONE_HUNDRED_THOUSAND = '$100,000',
  ONE_HUNDRED_FIFTY_THOUSAND = '$100,000',
}

export const homeLoanAccount1 = (current: number) => {
  return {
    title: 'Home loan 1:',
    subtitle: 'Current balance: +$10,000,000\nBSB: 123465 - AccNo: *****4688',
    buttons: [
      selectHomeLoanButton('HL1'),
      {
        type: 'web_url',
        title: 'View detail',
        url: `${process.env.BASE_URL}/1/${current}`,
        webview_height_ratio: 'compact', // tall, full
        messenger_extensions: true,
      },
    ],
  };
};

export const homeLoanAccount2 = (current: number) => {
  return {
    title: 'Home loan 2:',
    subtitle: 'Current balance: +$200,000,000\nBSB: 123465  AccNo: *****9876',
    buttons: [
      selectHomeLoanButton('HL2'),
      {
        type: 'web_url',
        title: 'View detail',
        url: `${process.env.BASE_URL}/2/${current}`,
        webview_height_ratio: 'compact',
        messenger_extensions: true,
      },
    ],
  };
};
