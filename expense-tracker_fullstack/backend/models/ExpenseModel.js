const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
   },
   amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true
   },
   type: {
      type: String,
      default: "expense"
   },
   date: {
      type: Date,
      required: true,
      trim: true
   },
   category: {
      type: String,
      required: true,
      trim: true
   },
   description: {
      type: String,
      required: true,
      maxLength: 60,
      trim: true
   },
   userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   }
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)
