const mongoose = require('mongoose')


const VideoSchema = new mongoose.Schema({

  title: {
    $type: String,
  },

  description: {
    $type: String,
  },

  thumbnail: {
    $type: String,
  },

  // video: {
  //   $type: String
  // },

  cloudinary_id: {
    $type: String
  },

  status: {
    $type: String,
    default: 'public',
    enum: ['public', 'private'],
  },

  user: {
    $type: mongoose.ObjectId,
    ref: 'User',
  },

  createdAt: {
    $type: Date,
    default: Date.now,
  },
},
  { typeKey: '$type' }
)

// create the model for users and expose it to our app
module.exports = mongoose.model('Video', VideoSchema)

