const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        
        try {
            const decode = jwt.verify(token, process.env.JWTSECRETKEY);
            const user = await User.findById(decode.userId);
            
            if (!user) {
                return res.json({success:  false, message: "Unauthorized access!"});
            } else {
                req.user = user;
                next();
            }
        } catch(error) {
            if (error.name == 'JsonWebTokenError') {
                return res.json({success:false, message: "Unauthorized access!"});
            } else if (error.name == 'TokenExpiredError') {
                return res.json({success:false, message: "Session expired error!"});
            } else {
                return res.json({success:false, message: "Unauthorized access!"});
            }
        }

    } else {
        res.json({success: false, message: "Unauthorized access!"})
    }
}