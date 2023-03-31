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
    description: {
        type: String,
        required: true,
        maxLength: 60,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    /*profile: {
        data: Buffer,
        contentType: String,
    },*/
    url: {
        type: String,
        required: true
    },
    tags: [String]
}, {timestamps: true})

module.exports = mongoose.model('Tweet', TweetSchema)
