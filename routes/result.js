var express = require('express');
var router  = express.Router();
var caseDB  = require('../models/api/resultHandle');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('result', {title : 'Result'});
});

router.get('/:menu?', function(req, res, next){
  console.log('GET[/menu]');
  var menu = req.params.menu;
  if(menu == 'apt'){
    console.log('[menu/apt]');
    res.render('resultSimilarCase', {title : 'Similar Case'});
  }
});

router.post('/sendtable', function(req, res){
  var obj = JSON.parse(req.body.data);
  caseDB.getCaseIndex(obj).then(function(result){
    for(let i = 0, pending = Promise.resolve(); i < result.length; i++){
      pending = pending.then(() => {
        return new Promise((resolve) =>{
          caseDB.compareTable(obj, result[i]).then(function(points){
            resolve(points);    // then(data)로 감.
          });
        });
      }).then((data) => {
        if(data != ''){
          //console.log(name);
          console.log(data);
        }
      });
    }
  });
});

module.exports = router;
