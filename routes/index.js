var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

var Cases = require('../models/api/inputCaseToDB');
var Ontology = require('../models/api/ontology');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '프로젝트 개발중...(index.js)' });
});

/* mongoDB에 케이스 조사하여 없는거 갱신하기 */
router.post('/updateDocument', function(req, res){
  var caseList = [];
  var nullCase = [];
  //console.log('response');

  Ontology.findCaseLists().then(function(caseList){
    Cases.checkCaseId(caseList).then(function(result){
      //console.log(result[0].caseindex);
      //console.log(caseList);
      for(var i = 0; i < result.length; i++){ //지금은 1
        var removePos = caseList.indexOf(result[i].caseindex); //지울 인덱스 찾기
        //console.log('지울원소 인덱스 : ' + removePos);
        caseList.splice(removePos, 1);
      }
      return new Promise(function(complete){
        for(let i = 0, pending = Promise.resolve(); i < caseList.length; i++){
          pending = pending.then(() => {
            return new Promise((resolve) => {
              Ontology.loadSpecificCase(caseList[i]).then(function(caseElement){
                //resolve(caseElement);
                Cases.insertCases(caseList[i], caseElement).then(function(resu){
                  resolve(resu);
                });

              });
            });
          }).then((data) =>{
            /*
            console.log(caseList[i] + 'start: ');
            for(var i = 0; i < data.length; i++){
                console.log(i + '번째 : ' + data[i].hasOwnProperty('phase'));
            }
            */
            console.log('cycle pass');
          });
        }
        console.log('이거는 한번만 나와야 정상입니다.');
        complete(true)
      }).then(function(sign){
        if(sign){
          console.log('완료');
          res.redirect('/');
        }

      });
    });
  });
});

module.exports = router;
