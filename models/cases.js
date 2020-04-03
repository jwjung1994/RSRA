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

var HumanSchema = new Schema({
  sr : String,
  detail : String,
  num : String
});

var TechnicalSchema = new Schema({
    sr : String,
    securitygoal : String,
    detail : String,
    num : String
});

var CaseSchema = new Schema({
  caseindex : String,
  attack_pattern : [CaseElementSchema],
  Hsr : [HumanSchema],
  Tsr : [TechnicalSchema]
});

module.exports = mongoose.model('case', CaseSchema);
