var express   = require('express');
var router    = express.Router();
var caseDB    = require('../models/api/resultHandle');
var Ontology  = require('../models/api/ontology');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('result', {title : 'Result'});
});
router.get('/apt', function(req, res, next){
  console.log('[menu/apt]');
  if(req.session.resultData != null){
    //console.log(req.session.resultData);
    var tbl = req.session.resultData.sort(function(a, b){
      return a.eleSimilarity < b.eleSimilarity ? 1 : a.eleSimilarity > b.eleSimilarity ? -1 : 0;
    });
    console.log(tbl);
    res.render('resultSimilarCase', {title : 'Similar Case', resultData : tbl});
  }
  else
    res.render('resultSimilarCase', {title : 'Similar Case', resultData : null});
  req.session.resultData = null;
  //console.log(req.session.resultData);
});
router.get('/risk/:a?', function(req, res, next){
  var a = req.params.a;
  console.log(a);
  Ontology.findAssetAVP(a).then(function(res0){
    Ontology.findAssetV(a).then(function(res1){ //-> Vulnerability(그림19-2)
      Ontology.findAssetAVT(a).then(function(res2){
          Ontology.findAssetP(a).then(function(res3){ //-> Attack Purpose(그림19-1)
              var aList = {};
              /*
              for(var r in res0){
                  if(!(r in aList)){
                      aList[r] = 1;
                      //console.log(r);
                  }else{
                      aList[r]+=res0[r];
                  }
              }
              */
              aList = res0;
              for(var r1 in res1){
                  if(!(r1 in aList)){
                      aList[r1] = 1;
                  }else{
                      aList[r1]+=res1[r1];
                  }
              }
              for(var r2 in res2){
                  if(!(r2 in aList)){
                      aList[r2] = 1;
                  }else{
                      aList[r2]+=res2[r2];
                  }
              }
              for(var r3 in res3){
                  if(!(r3 in aList)){
                      aList[r3] = 1;
                  }else{
                      aList[r3]+=res3[r3];
                  }
              }
              //console.log(sortObject(aList));
              res.render('resultsRiskAssessment', {title: 'RSRA Results', aList: sortObject(aList)});
          });
      });
    });
  });
});

function sortObject(o){
    var sorted = {},
    key, a = [];
    // 키이름을 추출하여 배열에 집어넣음
    for (key in o) {
        if (o.hasOwnProperty(key)) a.push(key);
    }
    // 키이름 배열을 정렬
    a.sort();
    // 정렬된 키이름 배열을 이용하여 object 재구성
    for (key=0; key<a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}


router.post('/sendtable', function(req, res){
  var obj = JSON.parse(req.body.data);
  var caseScore = [];
  var nm = 0;
  caseDB.getCaseIndex(obj).then(function(result){
    for(let i = 0, pending = Promise.resolve(); i < result.length; i++){
      pending = pending.then(() => {
        return new Promise((resolve) =>{
          caseDB.compareTable(obj, result[i]).then(function(pointsAndTable){
            resolve(pointsAndTable);    // then(data)로 감.
          });
        });
      }).then((data) => {
        //console.log(data.score[0]);

        if(data.score != ''){
          caseScore.push({
            casenm        : result[nm].caseindex,
            eleSimilarity : data.score[0],
            patSimilarity : data.score[1],
            tbl           : data.tle
          });
          console.log(caseScore[0].tbl['attack_pattern'].length);
          console.log(caseScore[0].tbl['attack_pattern'][0].phase);
        }

        //console.log('nm : ' + nm);
        if(nm == result.length - 1){
          //console.log('!!!!!!!!!!!!!!!!!!!!');
          req.session.resultData = caseScore;
          res.redirect('/result/apt');
        }
        nm++;
      });
    }
  });
  //res.redirect('/result/apt');
});

module.exports = router;
