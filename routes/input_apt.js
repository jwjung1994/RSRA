var express = require('express');
var router = express.Router();
var Elements = require('../models/elements')


var flag = 0;

var list_2 = [];
router.get('/', function(req, res, next) {
  var title = 'Input APT Case';

  if(flag == 1){             /* stage 선택 단계 요소들어왔을 때 */
    console.log('1번 출입구로 들어옴!!!!!!!!!!');
    var list_1 = [];
    Elements.find({stage : req.session.source1}, {_id : 0, stage : 1, elements : 1}, function(err, result){
      if(err){
        console.error(err);
      }
      console.log(result);
      if(result.length > 0){
        list_1.push(result[0].stage);
        for(var i = 0; i < result.length; i++){
          list_1.push(result[i].elements);
        }
      }
      else{
        list_1 = [req.session.source1];
      }
      //console.log(list_1);
      res.render('input_case', { title: title, lists_1 : list_1 });
      req.session.source1 = null;
      flag = 0;
      console.log(req.session.source1);
    });
  }
  else if(flag == 2){
    Elements.find({stage : req.session.source2}, {_id : 0, elements : 1, sub_elements : 1}, function(err, result){
      if(err){
        console.error(err);
      }
      if(result.length > 0){
        list_2.push(result[0].elements);
        for(var i = 0; i < result.length; i++){
          list_2.push(result[i].sub_elements);
        }
      }
      else{
        list_2 = [req.session.source2];
      }
      console.log(list_2);
      res.render('input_case', {title : title, lists_1 : list_1 });
      req.session.source1 = null;
      flag = 0;
    });
  }
  else if(flag == 0){
    console.log('2번 출입구로 들어옴!!!!!!!!!!');
    res.render('input_case', { title: title, lists_1 : null });
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
