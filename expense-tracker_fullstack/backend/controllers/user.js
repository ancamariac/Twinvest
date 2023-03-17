const User = require('../models/user')
const jwt = require('jsonwebtoken');
const sharp = require('sharp');

exports.createUser = async (req, res) => {
    const {username, email, password } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser) {
        return res.json({success: false, message: "This email is already in use, try sign-in"});
    } else {
        const user = await User({
           username, email, password
        });
        await user.save();
        res.json(user);
    }
}

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.json({success: false, message: 'User not found!'});
    } else {
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.json({success: false, message: 'Email or  password does not match!'});
        } else {
            const token = jwt.sign({userId: user._id}, process.env.JWTSECRETKEY, {expiresIn: '1d'});
            res.json({success:  true, user, token});
        }
    }
}

exports.uploadProfilePicture = async (req, res) => {
    const {user} = req;
    if (!user) {
        return res.status(401).json({succes: false, message: 'Unauthorized access!'});
    } else {
        try {
            const profileImageBuffer = req.file.buffer;
            const {width, height} = await sharp(profileImageBuffer).metadata();
            const avatar = await sharp(profileImageBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer();
            await User.findByIdAndUpdate(user._id, {avatar});
            res.status(201).json({success:true, message: "Your profile picture was updated!"});
        } catch(error) {
            res.status(500).json({success:false, message: "Server error on updating profile picture!"});
            console.log('Error while uploading profile picture', error.message);
        }
    }
}