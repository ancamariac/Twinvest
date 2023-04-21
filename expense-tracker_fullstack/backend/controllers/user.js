const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const sharp = require('sharp');

exports.createUser = async (req, res) => {
   const { username, email, password } = req.body;
   const isNewUser = await User.isThisEmailInUse(email);
   if (!isNewUser) {
      return res.json({ success: false, type: 'email', message: "This email is already in use, try sign-in" });
   } else {
      const user = await User({
         username, email, password
      });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, { expiresIn: '1d' });
      res.json({ success: true, user, token });
   }
}

exports.userSignIn = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email: email });
   if (!user) {
      return res.json({ success: false, type: 'user', message: 'User not found!' });
   } else {
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
         return res.json({ success: false, type: 'password', message: 'Invalid password!' });
      } else {
         const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, { expiresIn: '1d' });
         res.json({ success: true, user, token });
      }
   }
}

exports.updateInterests = async (req, res) => {
   try {

      const { id } = req.params;      
      
      const user = await User.findById(id);
      
      if (!user) {
         return res.status(404).send('User was not found!');
      }

      const newInterest = req.body.interests;
      const interests = user.interests;

      if (!interests.includes(newInterest)) {
         interests.push(newInterest);

         const filter = { _id: id };
         const update = { interests: interests };
         await User.updateOne(filter, update);

      } else {
         return res.status(500).send('Interest already exists!');
      }
      res.status(200).json(user);
   } catch (err) {
      console.error(err);
      res.status(500).send('Error when updating user interests.');
   }
}

exports.getInterests = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findById(id);
      res.status(200).json(user.interests);
   } catch (error) {
      res.status(500).json({ message: 'Server Error' })
   }
}

exports.deleteInterest = async (req, res) => {
   try {
      const { id } = req.params;

      const user = await User.findById(id);
         
      if (!user) {
         return res.status(404).send('User was not found!');
      }

      const interestDeleted = req.body.interests;
      const interests = user.interests;
      
      const filter = { _id: id };
      const update = { $pull: { interests: interestDeleted } };
      const result = await User.updateOne(filter, update);
   
      if (result.nModified === 0) {
         return res.status(500).send('Interest does not exist!');
      }
      res.status(200).json(user);
   } catch (err) {
      console.error(err);
      res.status(500).send('Error when updating user interests.');
   }
}

exports.uploadProfilePicture = async (req, res) => {
   const { user } = req;
   if (!user) {
      return res.status(401).json({ succes: false, message: 'Unauthorized access!' });
   } else {
      try {
         const profileImageBuffer = req.file.buffer;
         const { width, height } = await sharp(profileImageBuffer).metadata();
         const avatar = await sharp(profileImageBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer();
         await User.findByIdAndUpdate(user._id, { avatar });
         res.status(201).json({ success: true, message: "Your profile picture was updated!" });
      } catch (error) {
         res.status(500).json({ success: false, message: "Server error on updating profile picture!" });
         console.log('Error while uploading profile picture', error.message);
      }
   }
}