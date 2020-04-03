var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HumanSchema = new Schema({
    sr : String,
    detail : String,
    num : String
  });

  module.exports = mongoose.model('srcase_h', HumanSchema);