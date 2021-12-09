import { selectHomeLoanButton } from '@server/buttons';

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
