const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteLearnSchema = new Schema({
  user: {type: String},
  vidId: {type: String},
  word: {type: String},
  originSent: {type: String, default: "not given"},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const learn = mongoose.model('notepad_learn', noteLearnSchema)

const noteWantSchema = new Schema({
  user: {type: String},
  vidId: {type: String},
  word: {type: String},
  comment: {type: String, default: "not given"},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const want = mongoose.model('notepad_want', noteWantSchema)

module.exports.learn = learn;
module.exports.want = want;
