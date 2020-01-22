var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '프로젝트 개발중...(index.js)' });
});

module.exports = router;
