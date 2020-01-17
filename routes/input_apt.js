var express = require('express');
var router = express.Router();
var aptDB = require('../modules/DB_cases');
var Case_Schema = require('../modules/case_schema');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('input_case', { title: 'RSRA Input APT Case' });
    console.log(' >>>>> input_case 들어감');
});
/*
router.post('/', function(req, res, next){
    console.log(req.body);
    res.send(req.body);
});
*/
router.post('/apt', function(req, res, next){
  //var case_schema = new Case_Schema();
  console.log('>>> input_apt.js에서 수신!');
  console.log(req.body.data);
});

module.exports = router;
