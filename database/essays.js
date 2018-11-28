const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const essaySchema = new Schema({
  lessonNo:{type: String},
  userId: {type: String, unique: false},
  KeyLine:{type:String},
  script: {type: String},
  bodyType:{type: String},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now},
  updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
)}

const Essay = mongoose.model('essays', essaySchema)
module.exports = Essay;
