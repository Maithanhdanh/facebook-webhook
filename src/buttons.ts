export const viewAccountDetailsButton = (accountId) => {
  const payload = 'VIEW_ACCOUNT_DETAIL_PAYLOAD:' + accountId;
  return {
    'type': 'postback',
    'title': 'View Details',
    payload,
  };
};

export const confirmAccountButton = [
  { type: 'postback', title: 'Yes, make changes to my loan', payload: 'CONFIRM_PROCESSING_ACCOUNT' },
  { type: 'postback', title: 'No, talk to banker', payload: 'TALK_TO_BANKER' },
];
