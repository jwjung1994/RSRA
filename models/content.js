var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseElementSchema = new Schema({
  phase : String,
  element : String,
  sub_element1 : String,
  sub_element2 : String,
  sub_element3 : String,
  instance : String
});

module.exports = mongoose.model('content', CaseElementSchema);
