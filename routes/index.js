var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RSRA MAIN' });
});


router.post('/apt/case', function(req, res, next){
  //var case_schema = new Case_Schema();
  console.log('>>>index.js에서 수신!');
  console.log(req.body.data);
});
module.exports = router;
