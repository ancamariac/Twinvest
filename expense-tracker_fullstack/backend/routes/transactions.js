const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { getTweets } = require('../controllers/tweet');
const { getNews } = require('../controllers/news');
const { getPredictions } = require('../controllers/predictions');
const { getInterestsPrices } = require('../controllers/interests');
const { isAuth } = require("../middleware/auth");

const router = require('express').Router();

router.post('/add-income', isAuth, addIncome)
   .get('/get-incomes', isAuth, getIncomes)
   .delete('/delete-income/:id', deleteIncome)
   .post('/add-expense', isAuth, addExpense)
   .get('/get-expenses', isAuth, getExpense)
   .delete('/delete-expense/:id', deleteExpense)
   .get('/get-tweets', isAuth, getTweets)
   .get('/get-news', isAuth, getNews)
   .get('/get-predictions', isAuth, getPredictions)
   .get('/get-interests-prices', isAuth, getInterestsPrices) 

module.exports = router