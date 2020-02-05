var Cases = require('../cases');
var Content = require('../content');
var Promise = require('bluebird');

exports.checkCaseId = function checkCaseId(caseIndex){
  return new Promise(function(res){
    var count = caseIndex.length;
    //console.log(count);
    Cases.find({},{_id : 0, caseindex : 1}, function(err, result){
      res(result);
    })
  });
};

exports.insertCases = function insertCases(caseID, caseElement){
  return new Promise(function(res){
    var cases = new Cases();
    cases.caseindex = caseID;
    cases.save(function(err){
      if(err){
        console.log(err);
      }
      else{   // caseID 삽입완료했으니 내용물도 추가하는 거 코딩하기
        var contents = new Content();
        for(var i = 0; i < caseElement.length; i++){
          if(caseElement[i].hasOwnProperty('phase')){
            contents.phase = caseElement[i].phase.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.phase = '-';
          }
          if(caseElement[i].hasOwnProperty('sub1')){
            contents.element = caseElement[i].sub1.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.element = '-';
          }
          if(caseElement[i].hasOwnProperty('sub2')){
            contents.sub_element1 = caseElement[i].sub2.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.sub_element1 = '-';
          }
          if(caseElement[i].hasOwnProperty('sub3')){
            contents.sub_element2 = caseElement[i].sub3.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.sub_element2 = '-';
          }
          if(caseElement[i].hasOwnProperty('sub4')){
            contents.sub_element3 = caseElement[i].sub4.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.sub_element3 = '-';
          }
          if(caseElement[i].hasOwnProperty('instance')){
            contents.instance = caseElement[i].instance.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          }
          else{
            contents.instance = '-';
          }
          Cases.findOneAndUpdate({caseindex : caseID}, { $push : {attack_pattern : contents}}, function(err, result){
            if(err){
              console.log(err);
            }
          });
        }

        res('hi');
      }
    });

  });
};
