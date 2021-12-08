export const getPostbackPayload = (payload: string): string => {
  return 'postback:' + payload;
};
