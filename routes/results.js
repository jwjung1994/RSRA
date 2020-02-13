var express = require('express');
var router = express.Router();

var caseDB = require('../modules/DB_cases');
var Ontology = require('../modules/ontology');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('results', {title: 'RSRA Results'});
});

/*
apt : 유사도 높은 공격 (results_apt_template)
risk : 자산 위험 평가 (results_risk_assessment)
recommend : 보안 요구사항 명세 (results_recommend)
 */
router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'apt'){
        var newCase = {Reconnaissance_phase: ["personal_interest"], Delivery_phase: ["interest", "using_SNS", "relationship"], Initial_intrusion_phase: ["moke_hacking_tool_as_RAT"], Connecting_to_server_phase: ["inject_process"]};

        caseDB.getSimilarCase(newCase).then(function(result){
            Ontology.findCases(result).then(function (res1){
                Ontology.findSuperClasses(res1).then(function(results){
                    var phase = [];
                    var elements = [];
                    var classList = [];
                    for(var i in res1){
                        var cla = res1[i].y.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                        var ele = res1[i].x.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                        phase.push(cla);
                        elements.push(ele);
                    }

                    for(var j in results){
                        var obj = Object.keys(results[j]);
                        var r = results[j];
                        for(var k in elements){
                            if(obj[0] == elements[k]){
                                classList[k] = r[obj[0]];
                            }
                        }
                    }
                    //console.log(classList);
                    res.render('results_apt_template', {title: 'RSRA Results', phaseList: phase, classList: classList, elementList: elements});
                });
            });
        });
    }else next();
});//유사도 높은 공격 보여줌

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    var aList = {};
    if(menu == 'risk'){
        Ontology.findAssetAVP('').then(function(res0){
            Ontology.findAssetV('').then(function(res1){
                Ontology.findAssetAVT('').then(function(res2){
                    Ontology.findAssetP('').then(function(res3){
                        var aList = {};

                        for(var r in res0){
                            if(!(r in aList)){
                                aList[r] = 1;
                                console.log(r);
                            }else{
                                aList[r]+=res0[r];
                            }
                        }

                        console.log(aList);
                        for(var r1 in res1){
                            if(!(r1 in aList)){
                                aList[r1] = 1;
                            }else{
                                aList[r1]+=res1[r1];
                            }
                        }
                        console.log(aList);
                        for(var r2 in res2){
                            if(!(r2 in aList)){
                                aList[r2] = 1;
                            }else{
                                aList[r2]+=res2[r2];
                            }
                        }
                        console.log(aList);

                        for(var r3 in res3){
                            if(!(r3 in aList)){
                                aList[r3] = 1;
                            }else{
                                aList[r3]+=res2[r3];
                            }
                        }
                        console.log(aList);

                        res.render('results_risk_assessment', {title: 'RSRA Results', aList: aList});
                    });
                });
            });
        });
    }else next();
});//자산 위험 평가 내용

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'recommend'){
        res.render('results_recommend', {title: 'RSRA Results'});
    }else next();
});//보안 요구사항 명세

module.exports = router;
