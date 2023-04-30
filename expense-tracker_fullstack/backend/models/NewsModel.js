const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100
   },
   link: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200
   },
   date: {
      type: Date,
      required: true,
      trim: true
   },
   source: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
   },
   keyword: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true
   },
   label: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true
   }
}, { timestamps: true })

module.exports = mongoose.model('News', NewsSchema)
