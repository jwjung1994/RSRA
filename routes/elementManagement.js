var express = require('express');
var router = express.Router();
var element_h = require('../models/api/elementHandle');

router.get('/', function(req, res, next){
  element_h.loadElementTable().then(function(result){
      res.render('elementManagement', {title : '공격 요소 관리', rows : result});
  });
});

// 요소 추가
router.post('/add', function(req, res){
  element_h.addElement(req.body).then(function(result){
    res.redirect(result);
  });
});

// 선택행 삭제
router.post('/delete', function(req, res){
  element_h.deleteRow(req.body.data).then(function(result){
    console.log(result);
  });
});

module.exports = router;
