import { ButtonPayload } from './constants';

export interface MessengerButton {
  type: string;
  payload: string;
  title: string;
}

export class ButtonBuilder {
  private readonly _button: MessengerButton;

  constructor() {
    this._button = {
      type: 'postback',
      payload: '',
      title: '',
    };
  }

  withType(type: string): ButtonBuilder {
    this._button.type = type;
    return this;
  }

  withTitle(title: string): ButtonBuilder {
    this._button.title = title;
    return this;
  }

  withPayload(payload: string): ButtonBuilder {
    this._button.payload = payload;
    return this;
  }

  build(): MessengerButton {
    return this._button;
  }
}

export const getViewAccountDetailsButton = (
  account: string,
): MessengerButton => {
  const payload = ButtonPayload.VIEW_ACCOUNT_DETAIL + account;
  return new ButtonBuilder()
    .withPayload(payload)
    .withTitle('View Details')
    .build();
};

export const confirmLoanButtons = [
  new ButtonBuilder()
    .withPayload(ButtonPayload.VIEW_TERM)
    .withTitle('View selected terms')
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.ACCEPT_TERM)
    .withTitle('Agree and submit')
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.CANCEL_TERM)
    .withTitle('not agree and cancel')
    .build(),
];

export const selectTermButton = new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_TERM)
  .withTitle('Select')
  .build();

export const selectHomeLoanButton = (account) => new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_HOME_LOAN + '_' + account)
  .withTitle('Select')
  .build();

export const persistent_menu = [
  {
    locale: 'default',
    composer_input_disabled: false,
    call_to_actions: [
      {
        type: 'postback',
        title: 'Talk to me',
        payload: 'BOOTBOT_GET_STARTED',
      },
      {
        type: 'postback',
        title: 'Help Loan',
        payload: 'PERSISTENT_MENU_HELP',
      },
      {
        type: 'web_url',
        title: 'Support website',
        url: 'https://www.google.com/',
        webview_height_ratio: 'full',
      },
    ],
  },
];

export const refixFlowButtons = [
  new ButtonBuilder()
    .withPayload(ButtonPayload.VIEW_ALL_ACCOUNTS)
    .withTitle('View all my account')
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.TALK_TO_BANKER)
    .withTitle('Talk to banker')
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.NO_THANKS)
    .withTitle('No, thanks')
    .build(),
];
