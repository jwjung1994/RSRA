var express = require('express');
var router = express.Router();
var element_h = require('../models/input_case');

var flag = 0;

router.get('/', function(req, res, next) {
  var title = 'Input APT Case';
  var list1, list2, list3, list4;

  if(flag == 1){             /* stage 선택 단계 요소들어왔을 때 */
    element_h.getElementsbyStage(req.session.source1).then(function(result){
      this.list1 = result;
      //res.render('input_case', { title: title, lists_1 : this.list1, lists_2 : null, lists_3 : null, lists_4 : null });
      res.send(200, { title: title, lists_1 : this.list1, lists_2 : null, lists_3 : null, lists_4 : null });
      req.session.source1 = null;
      flag = 0;
    });
  }
  else if(flag == 2){
    element_h.getSubelements1byElements(req.session.source2).then(function(result){
      this.list2 = result;
      //res.render('input_case', {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : null, lists_4 : null });
      res.send(200, {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : null, lists_4 : null });
      req.session.source2 = null;
      flag = 0;
    });
  }
  else if(flag == 3){
    //console.log('플래그 3 진입');
    element_h.getSubelements2byElements(req.session.source3).then(function(result){
      this.list3 = result;
      //console.log('>>> flag2 return 결과값 : ' + this.list2);
      //res.render('input_case', {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : this.list3, lists_4 : null });
      res.send(200, {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : this.list3, lists_4 : null });
      req.session.source3 = null;
      flag = 0;
    });
  }
  else if(flag == 4){
    element_h.getSubelements3byElements(req.session.source4).then(function(result){
      this.list4 = result;
      //res.render('input_case', {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : this.list3, lists_4 : this.list4 });
      res.send(200, {title : title, lists_1 : this.list1, lists_2 : this.list2, lists_3 : this.list3, lists_4 : this.list4 });
      req.session.source4 = null;
      flag = 0;
    });
  }
  else if(flag == 0){
    res.render('input_case', { title: title, lists_1 : null, lists_2 : null, lists_3 : null, lists_4 : null });
  }
});
// element
router.post('/select_element', function(req, res, next){
    //var stage_val = req.body.data;
    req.session.source1 = req.body.data;
    flag = 1;
    res.redirect('/case');
});
// sub_elements1
router.post('/select_sub_element1', function(req, res, next){
    //var stage_val = req.body.data;
    req.session.source2 = req.body.data;
    flag = 2;
    res.redirect('/case');
});
// sub_elements2
router.post('/select_sub_element2', function(req, res, next){
    //var stage_val = req.body.data;
    //console.log('라우트 속 매개변수값 :' + req.body.data);
    req.session.source3 = req.body.data;
    flag = 3;
    res.redirect('/case');
});
// sub_elements3
router.post('/select_sub_element3', function(req, res, next){
    //var stage_val = req.body.data;
    req.session.source4 = req.body.data;
    flag = 4;
    res.redirect('/case');
});
module.exports = router;
