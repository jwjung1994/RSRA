var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var elementsSchema = new Schema({
  stage : String,
  elements : String,
  sub_elements1 : String,
  sub_elements2 : String,
  sub_elements3 : String,
  instance : String
});

module.exports = mongoose.model('Element', elementsSchema);
                                 //ex_samples 라는 document생성
                                //Element + s : apt 단계와 공격요소 저장하는 document
