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


//show single stories
router.get('/:id', async (req, res) => {
  try {
    let video = await Video.findById(req.params.id)
      .populate('user')
      .lean()
    if (!video) {
      return res.render('error/500')
    }
    res.render('show2', {
      video,//this is me passing the data to the view
    })
  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
});


//edit videos
router.get('/edit/:id', alreadyin, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
    }).lean()
    res.render('edit', {
      video,//this is me passing the data to the view
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
});





// show add page
router.delete('/:id', alreadyin, async (req, res) => {
  try {
    await Video.deleteOne({ _id: req.params.id })
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    return res.render(' error/500')
  }

});



module.exports = {router}
