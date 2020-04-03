var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechnicalSchema = new Schema({
    sr : String,
    securitygoal : String,
    detail : String,
    num : String
});

module.exports = mongoose.model('srcase_t', TechnicalSchema);