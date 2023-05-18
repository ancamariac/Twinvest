const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
   keyword: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true
   },
   ticker: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Interest', InterestSchema)
