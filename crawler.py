import os
import csv
import tweepy as tw
import os
import pymongo
from dotenv import load_dotenv

# load the environment variables
load_dotenv()

# set the API credentials
consumer_key = os.getenv("CONSUMER_KEY")
consumer_secret = os.getenv("CONSUMER_SECRET")
access_token = os.getenv("ACCESS_TOKEN")
access_token_secret = os.getenv("ACCESS_TOKEN_SECRET")

# set up the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.mydatabase
collection = db.tweets

# set the search keywords
search_words = "#economy OR #stocks OR #cryptocurrency"

# set the number of tweets to retrieve
num_of_tweets = 20

# authenticate the API credentials
auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# search for the tweets and write them to a CSV file
tweets = tw.Cursor(api.search_tweets, q=search_words, lang="en", tweet_mode="extended").items(num_of_tweets)
for tweet in tweets:
    tweet_data = {
        "date": tweet.created_at,
        "name": tweet.user.name,
        "username": tweet.user.screen_name,
        "followers": tweet.user.followers_count,
        "likes": tweet.favorite_count,
        "tweet": tweet.full_text,
        "source": tweet.source,
        "retweets": tweet.retweet_count,
        "hashtags": [tag['text'] for tag in tweet.entities['hashtags']],
        "mentions": [user['screen_name'] for user in tweet.entities['user_mentions']]
    }
    collection.insert_one(tweet_data)