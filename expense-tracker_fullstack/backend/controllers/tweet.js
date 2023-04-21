const TweetSchema = require("../models/TweetModel")
const User = require("../models/user")
const jwt = require('jsonwebtoken');

exports.addTweet = async (req, res) => {
   const { name, username, description, date, url, tags } = req.body

   console.log('Tweet:', { name, username, tweet, date, profile_image, followers, likes, spurce, retweets, hashtags, mentions, tweet_link });

   const tweet = TweetSchema({
      name,
      username,
      tweet,
      date,
      profile_image,
      followers,
      likes,
      replies,
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
}

exports.getTweets = async (req, res) => {
   if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      
      try {

         const decode = jwt.verify(token, process.env.JWTSECRETKEY);
         const user = await User.findById(decode.userId);

         if (!user) {
            return res.json({ success: false, message: "Unauthorized access!" });        
         }
         
         const tags = user.interests

         const tweets = await TweetSchema.find({ hashtags: { $in: tags } }).sort({ createdAt: -1 })

         res.status(200).json(tweets)

      } catch (error) {
         if (error.name == 'JsonWebTokenError') {
            return res.json({ success: false, message: "Unauthorized access!" });
         } else if (error.name == 'TokenExpiredError') {
            return res.json({ success: false, message: "Session expired error!" });
         } else {
            return res.json({ success: false, message: "Unauthorized access!" });
         }
      }
   }
}
