const express = require('express')
const router = express.Router()
const { alreadyin } = require('../middlewares/auth')
const Video = require('../models/Video')
const cloudinary = require('../config/cloudinary')
const upload = require('../config/multer')
const fs = require('fs');







module.exports = router
