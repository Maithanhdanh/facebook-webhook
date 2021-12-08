import { ButtonPayload } from './constants';

export interface MessengerButton {
  type?: 'postback';
  payload: string;
  title: string;
}

export class ButtonBuilder {
  private readonly _button: MessengerButton;

  constructor() {
    this._button = {
      payload: '',
      title: '',
    };
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

export const getViewAccountDetailsButton = (accountId: string): MessengerButton => {
  const payload = ButtonPayload.VIEW_ACCOUNT_DETAIL + ':' + accountId;
  return new ButtonBuilder().withPayload(payload).withTitle('View Details').build();
};

export const confirmAccountButtons = [
  new ButtonBuilder().withPayload(ButtonPayload.CONFIRM_PROCESSING_ACCOUNT).withTitle('Yes, make changes to my loan').build(),
  new ButtonBuilder().withPayload(ButtonPayload.TALK_TO_BANKER).withTitle('No, talk to banker').build(),
];
