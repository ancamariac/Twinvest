const TweetSchema = require("../models/TweetModel")
const User = require("../models/user")
const jwt = require('jsonwebtoken');

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
