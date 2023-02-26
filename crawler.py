import os
import csv
import tweepy as tw
import os
from dotenv import load_dotenv

# set the API credentials
consumer_key = os.getenv("CONSUMER_KEY")
consumer_secret = os.getenv("CONSUMER_SECRET")
access_token = os.getenv("ACCESS_TOKEN")
access_token_secret = os.getenv("ACCESS_TOKEN_SECRET")

# set the search keywords
search_words = "#economy OR #stocks OR #cryptocurrency"

# set the number of tweets to retrieve
num_of_tweets = 500

# authenticate the API credentials
auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# search for the tweets and write them to a CSV file
tweets = tw.Cursor(api.search_tweets, q=search_words, lang="en", tweet_mode="extended").items(num_of_tweets)
with open("tweets.csv", "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Date", "User", "Followers", "Likes", "Tweet"])
    for tweet in tweets:
        writer.writerow([tweet.created_at, tweet.user.screen_name, tweet.user.followers_count, tweet.favorite_count, tweet.full_text])