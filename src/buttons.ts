export const persistent_menu =
  [
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: "postback",
          title: "Talk to me",
          payload: "BOOTBOT_GET_STARTED"
        },
        {
          type: "postback",
          title: "Help Loan",
          payload: "PERSISTENT_MENU_HELP"
        },
        {
          type: "web_url",
          title: "Support website",
          url: "https://www.google.com/",
          webview_height_ratio: "full"
        }
      ]
    }
  ]
