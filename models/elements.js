var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var elementsSchema = new Schema({
  stage : String,
  elements : String,
  sub_elements : String
});

module.exports = mongoose.model('ex_sample', elementsSchema);
                                 //ex_samples 라는 document생성
