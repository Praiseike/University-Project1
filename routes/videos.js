const express = require('express')
const router = express.Router()
const { alreadyin } = require('../middlewares/auth')
const Video = require('../models/Video')
const cloudinary = require('../config/cloudinary')
const upload = require('../config/multer')
const fs = require('fs');





// show add page
router.get('/add', alreadyin, (req, res) => {
  res.render('addvideo', {
  })
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});





module.exports = router
