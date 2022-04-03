
[x] Use Twitter API to authenticate user (Login with twitter)
[x] On successful login, `provide JWT token` in response for authenticating authorised endpoints
[x] Create authentication middleware
[x] Fetch tweets from Twitter API for authenticated user
[ ] and store in the DB (tweets collection)
[ ] Apply input validation using Joi Library on endpoint payloads wherever applicable


API Endpoints:
1. Fetch tweets from DB - https://api.twitter.com/2/users/{:authenticated_user_twitter_id}/tweets
2. Fetch single tweet from DB using ID
3. Edit tweet (only tweet text)
4. Delete tweet
5. Refresh latest tweets in DB (Syncing tweets to DB)