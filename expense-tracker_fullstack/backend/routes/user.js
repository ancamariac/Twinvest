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

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.put('/update-interests', isAuth, updateInterests)
router.get('/get-interests', isAuth, getInterests) 
router.put('/delete-interest', isAuth, deleteInterest) 
router.put('/change-password', isAuth, changePassword)
router.put('/initIncomeObjective', isAuth, initIncomeObjective)
router.put('/initExpenseLimit', isAuth, initExpenseLimit);
router.get('/getExpenseLimit', isAuth, getExpenseLimit);
router.get('/getIncomeObjective', isAuth, getIncomeObjective);

module.exports = router;