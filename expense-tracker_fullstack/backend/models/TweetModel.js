const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
   },
   username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
   },
   tweet: {
      type: String,
      required: true,
      maxLength: 200,
      trim: true
   },
   date: {
      type: Date,
      required: true,
      trim: true
   },
   profile_image: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
   },
   followers: {
      type: Number,
      integerOnly: true,
      required: true
   },
   likes: {
      type: Number,
      integerOnly: true,
      required: true
   },
   source: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
   },
   retweets: {
      type: Number,
      integerOnly: true,
      required: true
   },
   reply_count: {
      type: Number,
      integerOnly: true,
      required: true
   },
   hashtags: [String],
   mentions: [String],
   tweet_link: {
      type: String,
      required: true,
      maxLength: 200,
      trim: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Tweet', TweetSchema)
