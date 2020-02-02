var express = require('express');
var router = express.Router();
var Ontology = require('../models/ontology');

/* GET home page. */
router.get('/', function(req, res, next) {

 /* case 리스트 불러오기
  Ontology.findCases_exp().then(function(result){
    console.log(result);
    console.log(result[0].cases.value);
    console.log(result[1].cases.value);

  });
*/
/*
  Ontology.findCases_exp3().then(function(result){
    console.log(result);

  });
  */
  res.render('index', { title: '프로젝트 개발중...(index.js)' });
});

module.exports = router;
