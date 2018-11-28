const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scriptSchema = new Schema({
  vidId: {type: String, unique: true},
  script: [{startTime: String,
            content: String}]

})

const Script = mongoose.model('videoScripts', scriptSchema)
module.exports = Script;
