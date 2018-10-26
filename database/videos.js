const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title:{type: String},
  vidId: {type: String, unique: true},
  category: {type: String},
  lessonId: {type: String, unique: true},
  created_at: {type: Date, index: {unique: false}, 'default': Date.now},
  updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
})

const Video = mongoose.model('videos', videoSchema)
module.exports = Video;
