const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
   keyword: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true
   },
   positive: { 
      type: Number,
      required: true,
      trim: true,
      maxLength: 20
   },
   negative: { 
      type: Number,
      required: true,
      trim: true,
      maxLength: 20
   },
   neutral: { 
      type: Number,
      required: true,
      trim: true,
      maxLength: 20
   },
   score: { 
      type: Number,
      required: true,
      trim: true,
      maxLength: 20
   },
   last_update: {
      type: Date,
      required: true,
      trim: true
   },
   trend: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Predictions', PredictionSchema)
