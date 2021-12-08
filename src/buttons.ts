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
  accountId: string,
): MessengerButton => {
  const payload = ButtonPayload.VIEW_ACCOUNT_DETAIL + accountId;
  return new ButtonBuilder()
    .withPayload(payload)
    .withTitle('View Details')
    .build();
};

export const confirmAccountButtons = [
  new ButtonBuilder()
    .withPayload(ButtonPayload.CONFIRM_PROCESSING_ACCOUNT)
    .withTitle('Yes, modify loan')
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.TALK_TO_BANKER)
    .withTitle('Talk to banker')
    .build(),
];

export const selectTermButton = new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_TERM)
  .withTitle('Select Term')
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
      new ButtonBuilder()
        .withPayload(ButtonPayload.ELIGIBLE_ACCOUNTS)
        .withTitle('Show eligible accounts')
        .build(),
    ],
  },
];
