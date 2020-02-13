/* 몽고DB Table 1 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var caseSchema = new Schema({
    case_id: String,
    op_name: String,
    elements: {
        Reconnaissance_phase: Array,
        Delivery_phase: Array,
        Initial_intrusion_phase: Array,
        Connecting_to_server_phase: Array,
        Lateral_movement_phase: Array,
        Information_gathering_phase: Array,
        Completing_the_attack_phase: Array
    },
    case_type: String
}, {collection: 'apt_cases'});

module.exports = mongoose.model('apt_case', caseSchema);
