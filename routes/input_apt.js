var express = require('express');
var router = express.Router();
var element_h = require('../models/input_case');

var flag = 0;

router.get('/', function(req, res, next) {
  var title = 'Input APT Case';
  var list1;
  var list2;
  if(flag == 1){             /* stage 선택 단계 요소들어왔을 때 */
    element_h.getElementsbyStage(req.session.source1).then(function(result){
      this.list1 = result;
      res.render('input_case', { title: title, lists_1 : this.list1, lists_2 : null });
      req.session.source1 = null;
      flag = 0;
    });
  }
  else if(flag == 2){
    console.log('>>> flag2로 들어옴');
    element_h.getSubelementsbyElements(req.session.source2).then(function(result){
      this.list2 = result;
      //console.log('>>> flag2 return 결과값 : ' + this.list2);
      res.render('input_case', {title : title, lists_1 : this.list1, lists_2 : this.list2 });
      req.session.source1 = null;
      flag = 0;
    });

  }
  else if(flag == 0){
    //console.log('2번 출입구로 들어옴!!!!!!!!!!');
    res.render('input_case', { title: title, lists_1 : null, lists_2 : null });
  }
});

router.post('/select_element', function(req, res, next){
    //var stage_val = req.body.data;
    req.session.source1 = req.body.data;
    flag = 1;
    res.redirect('/case');
});

router.post('/select_sub_element', function(req, res, next){
    //var stage_val = req.body.data;
    req.session.source2 = req.body.data;
    flag = 2;
    res.redirect('/case');
});
module.exports = router;
