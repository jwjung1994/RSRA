var Cases = require('../cases');
var Content = require('../content');
var Promise = require('bluebird');

var SRcase_H = require('../srcase_h');
var SRcase_T = require('../srcase_t');

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
      else{   
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

        res('end');
      }
    });

  });
};

exports.insertHSR = function insertHSR(caseID, caseElement){
  return new Promise(function(res){ 
    var SRcase_h = new SRcase_H();
    for(var i = 0; i < caseElement.length; i++){
      SRcase_h.sr = caseElement[i].sr;
      SRcase_h.detail = caseElement[i].detail;
      SRcase_h.num = caseElement[i].num;
      //console.log(SRcase_h);

      Cases.findOneAndUpdate({caseindex : caseID}, { $push : {Hsr : SRcase_h}}, function(err, result){
        if(err){
          console.log(err);
        }
      });
    }
    res('end');
  });
};

exports.insertTSR = function insertTSR(caseID, caseElement){
  return new Promise(function(res){
    var SRcase_t = new SRcase_T();
    for(var i = 0; i < caseElement.length; i++){
      SRcase_t.sr = caseElement[i].sr;
      SRcase_t.securitygoal = caseElement[i].securitygoal;
      SRcase_t.detail = caseElement[i].detail;
      SRcase_t.num = caseElement[i].num;

      Cases.findOneAndUpdate({caseindex : caseID}, { $push : {Tsr : SRcase_t}}, function(err, result){
        if(err){
          console.log(err);
        }
      });
    }
    res('end');
  });
};