const TweetSchema = require("../models/TweetModel")


exports.addTweet = async (req, res) => {
   const { name, username, description, date, url, tags } = req.body

   //const userid = req.user["_id"];

   //console.log('User ID:', userid);
   console.log('Tweet:', { name, username, tweet, date, profile_image, followers, likes, spurce, retweets, hashtags, mentions, tweet_link });

   const tweet = TweetSchema({
      name,
      username,
      tweet,
      date,
      profile_image,
      followers,
      likes,
      source,
      retweets,
      hashtags,
      mentions,
      tweet_link
   })

   try {
      //validations
      if (!name || !username || !tweet || !date) {
         return res.status(400).json({ message: 'All fields are required!' })
      }
      await tweet.save()
      res.status(200).json({ message: 'Tweet Added' })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server Error' })
   }

   console.log(tweet)
}

exports.getTweets = async (req, res) => {
   try {
      const tweets = await TweetSchema.find().sort({ createdAt: -1 })
      res.status(200).json(tweets)
   } catch (error) {
      res.status(500).json({ message: 'Server Error' })
   }
}
