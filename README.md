- Add whitelist domain:

curl --location --request POST 'https://graph.facebook.com/v12.0/me/messenger_profile?
access_token=<PAGE_ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{"whitelisted_domains":["website_domain"]}'