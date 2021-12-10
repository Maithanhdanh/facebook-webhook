import { ButtonPayload } from '@server/constants';

export interface MessengerButton {
  type: string;
  payload: string;
  title: string;
  url?: string;
  webview_height_ratio?: webview_height_type;
  messenger_extensions?: boolean;
}

export type webview_height_type = "compact" | "tall" | "full"

export class ButtonBuilder {
  private readonly _button: MessengerButton;

  constructor() {
    this._button = {
      type: 'postback',
      payload: '',
      title: ''
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

  withUrl(url: string): ButtonBuilder {
    this._button.url = url;
    return this;
  }

  withHeightRatio(type: webview_height_type): ButtonBuilder {
    this._button.webview_height_ratio = type;
    return this;
  }

  withMessengerExtension(active: boolean): ButtonBuilder {
    this._button.messenger_extensions = active;
    return this;
  }

  build(): MessengerButton {
    return this._button;
  }
}

export const confirmLoanButtons = (current: number) => [
  new ButtonBuilder()
    .withTitle('View selected terms')
    .withType('web_url')
    .withUrl(`${process.env.BASE_URL}/confirm/2/${current}`)
    .withMessengerExtension(true)
    .withHeightRatio("full")
    .build(),
  new ButtonBuilder()
    .withPayload(ButtonPayload.CANCEL_TERM)
    .withTitle('Not agree and cancel')
    .build(),
];

export const selectTermButton = new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_TERM)
  .withTitle('Select Term')
  .build();

export const selectHomeLoanButton = (account: string) => new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_HOME_LOAN + '_' + account)
  .withTitle('Select Loan')
  .build();

export const selectHomeLoanDetailButton =  new ButtonBuilder()
  .withPayload(ButtonPayload.SELECT_HOME_LOAN_DETAILS)
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
