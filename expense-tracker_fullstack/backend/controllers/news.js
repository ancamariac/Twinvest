const NewsSchema = require("../models/NewsModel")
const User = require("../models/user")
const jwt = require('jsonwebtoken');

exports.getNews = async (req, res) => {
   if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      
      try {

         const decode = jwt.verify(token, process.env.JWTSECRETKEY);
         const user = await User.findById(decode.userId);

         console.log('user', user)

         if (!user) {
            return res.json({ success: false, message: "Unauthorized access!" });        
         }
         
         const tags = user.interests

         const news = await NewsSchema.find({ keyword: { $in: tags } }).sort({ createdAt: -1 })

         res.status(200).json(news)

      } catch (error) {
         if (error.name == 'JsonWebTokenError') {
            return res.json({ success: false, message: "Unauthorized access!" });
         } else if (error.name == 'TokenExpiredError') {
            return res.json({ success: false, message: "Session expired error!" });
         } else {
            return res.json({ success: false, message: "Unauthorized access!" });
         }
      }
   }
}
