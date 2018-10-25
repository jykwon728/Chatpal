const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{type: String},
  googleId: {type: String, unique: true},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now},
  updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const User = mongoose.model('googleUser', userSchema)
module.exports = User;
