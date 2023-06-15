const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
      cb(null, true);
   } else {
      cb('Invalid image file!', false);
   }
}

const uploads = multer({ storage, fileFilter });

const { createUser, userSignIn, uploadProfilePicture, updateInterests, getInterests, deleteInterest, changePassword, initIncomeObjective, initExpenseLimit, getExpenseLimit, getIncomeObjective } = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middleware/validation/user');
const { isAuth } = require('../middleware/auth');

router.post('/create-user', validateUserSignUp, userValidation, createUser)
   .post('/sign-in', validateUserSignIn, userValidation, userSignIn)
   .put('/update-interests', isAuth, updateInterests)
   .get('/get-interests', isAuth, getInterests) 
   .put('/delete-interest', isAuth, deleteInterest) 
   .put('/change-password', isAuth, changePassword)
   .put('/initIncomeObjective', isAuth, initIncomeObjective)
   .put('/initExpenseLimit', isAuth, initExpenseLimit)
   .get('/getExpenseLimit', isAuth, getExpenseLimit)
   .get('/getIncomeObjective', isAuth, getIncomeObjective)

module.exports = router;