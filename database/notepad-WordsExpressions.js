const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteWordSchema = new Schema({
  user: {type: String},
  vidId: {type: String},
  word: {type: String},
  comment: {type: String},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const words = mongoose.model('notepad_word', noteWordSchema)

const noteExpressionSchema = new Schema({
  user: {type: String},
  vidId: {type: String},
  expression: {type: String},
  comment: {type: String},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const expressions = mongoose.model('notepad_expression', noteExpressionSchema)

module.exports.words = words;
module.exports.expressions = expressions;
