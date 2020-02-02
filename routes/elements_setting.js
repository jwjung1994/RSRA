var express = require('express');
var router = express.Router();
var Elements = require('../models/elements')

router.get('/', function(req, res, next){
  //console.log('redirected to elements_setting!');
  Elements.find({}, function(err, row_datas){
    res.render('elements_setting', {title : '공격 요소 관리', rows : row_datas});
  });
});

// 요소 추가
router.post('/add', function(req, res){
  var eles = new Elements();
  eles.stage = req.body.selectedStage;
  eles.elements = req.body.main_element;
  eles.sub_elements1 = req.body.sub_element1;
  eles.sub_elements2 = req.body.sub_element2;
  eles.sub_elements3 = req.body.sub_element3;
  eles.instance = req.body.instance;
  eles.save(function (err) {
    if(err){
      console.log(err);
    }
    else{
      console.log('save success!');
    }
  res.redirect('/elements');
  });
});

// 선택행 삭제
router.post('/delete', function(req, res){
   var id_val = req.body.data;

  Elements.deleteOne({ _id : id_val}, function(err){
    if(err){
      console.log(err);
    }
  });
});

module.exports = router;
