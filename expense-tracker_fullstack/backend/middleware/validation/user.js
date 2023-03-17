const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
    check('username')
    .trim()
    .notEmpty()
    .withMessage('Username is empty!')
    .isLength({ min: 3, max: 20})
    .withMessage('Name must be within 3 to 20 characters!'),
    
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email!'),
    
    check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is empty!')
    .isLength({min: 8, max: 20})
    .withMessage('Password must have within 8 and 20 characters!'),
    
    check('confirmPassword')
    .trim()
    .notEmpty().withMessage('Confirmed password is empty!')
    .custom((value, {req}) => {
        if (value != req.body.password) {
            throw new Error("Passwords don't match!")
        } else {
            return true;
        }
    })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (result.length == 0) {
        return next();
    } else {
        const error = result[0].msg;
        return res.json({success: false, message: error});
    }
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required!'),
    check('password').trim().notEmpty().withMessage('email / password is required!')
]