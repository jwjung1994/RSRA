var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

var Cases = require('../models/api/inputCaseToDB');
var Ontology = require('../models/api/ontology');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RSRA' });
});

/* mongoDB에 케이스 조사하여 없는거 갱신하기 */
router.post('/updateDocument', function(req, res){
  var caseList = [];
  var nullCase = [];
  //console.log('response');

  // 온톨로지 사례 index 추출
  Ontology.findCaseLists().then(function(caseList){
    Cases.checkCaseId(caseList).then(function(result){
      //console.log(result[0].caseindex);
      //console.log("caselist = " + caseList);
      for(var i = 0; i < result.length; i++){ 
        var removePos = caseList.indexOf(result[i].caseindex); //지울 인덱스 찾기
        //console.log('지울원소 인덱스 : ' + removePos);
        caseList.splice(removePos, 1);
      }
      return new Promise(function(complete){
        for(let i = 0, pending = Promise.resolve(); i < caseList.length; i++){
          pending = pending.then(() => {
            return new Promise((resolve) => {
              // 케이스 시나리오 추출
              Ontology.loadSpecificCase(caseList[i]).then(function(caseElement){
                Cases.insertCases(caseList[i], caseElement).then(function(resu){
                  // 인적 요구사항 추출
                  Ontology.findHumanSR(caseList[i]).then(function(caseSR){
                    //console.log(caseSR);
                    Cases.insertHSR(caseList[i], caseSR).then(function(resu){
                      resolve(resu);
                    });
                  });
                  Ontology.findTechSR(caseList[i]).then(function(caseSR){
                    //console.log(caseSR);
                    Cases.insertTSR(caseList[i], caseSR).then(function(resu){
                      resolve(resu);
                    });
                  });
                  
                });
              });
            });
          }).then((data) =>{
            console.log('cycle pass');
          });
        }
        complete(true)
      }).then(function(sign){
        if(sign){
          console.log('사례 load 완료');
          res.redirect('/');
        }
      });
    });
  });
});

module.exports = router;
