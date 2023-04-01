import os
import csv
import tweepy as tw
import os
import pymongo
from dotenv import load_dotenv
from crypto import crypto
from general_economy import economicTerms
from stocks import stocks

# load the environment variables
load_dotenv()

# set the API credentials
consumer_key = os.getenv("CONSUMER_KEY")
consumer_secret = os.getenv("CONSUMER_SECRET")
access_token = os.getenv("ACCESS_TOKEN")
access_token_secret = os.getenv("ACCESS_TOKEN_SECRET")

# set up the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.test
collection = db.tweets

# set the search keywords
crypto = [word.lower() for word in crypto]
economicTerms = [word.lower() for word in economicTerms]
stocks = [word.lower() for word in stocks]

search_words = crypto + economicTerms + stocks

#search_words = ["Bitcoin", "Ethereum", "Cardano", "Tesla", "Apple", "Microsoft"]
#print(search_words[1:200])
#exit(0)

# set the number of tweets to retrieve
num_of_tweets = 1

# authenticate the API credentials
auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# search for the tweets and write them to a CSV file
tweets = tw.Cursor(api.search_tweets, q=crypto, lang="en", tweet_mode="extended").items(num_of_tweets)
for tweet in tweets:
    
    tweet_data = {
        "date": tweet.created_at,
        "name": tweet.user.name,
        "username": tweet.user.screen_name,
        "profile_image": tweet.user.profile_image_url_https,
        "followers": tweet.user.followers_count,
        "likes": tweet.favorite_count,
        "tweet": tweet.full_text,
        "source": tweet.source,
        "retweets": tweet.retweet_count,
        "hashtags": [tag['text'] for tag in tweet.entities['hashtags']],
        "mentions": [user['screen_name'] for user in tweet.entities['user_mentions']],
        "tweet_link": f"https://twitter.com/{tweet.user.screen_name}/status/{tweet.id}"
    }
    collection.insert_one(tweet_data)