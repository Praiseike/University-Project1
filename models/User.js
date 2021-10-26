const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
  // define the schema for our user model
  local: {
    email: String,
    password: String
  },

  facebook: {
    id: String,
    name: String,
    image: String,
    token: String
  },

  twitter: {
    id: String,
    name: String,
    image: String,
    token: String,
  },

  google: {
    id: String,
    name: String,
    image: String,
    token: String,
  },

  github: {
    id: String,
    name: String,
    image: String,
    token: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});



// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password.toString(), this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);

