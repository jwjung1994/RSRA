var Elements = require('../elements');
var Promise = require('bluebird');

exports.getElementsbyStage = function (stage_ele){
  return new Promise(function(resolve, reject){
    var list_1 = [];
    //Elements.find({stage : stage_ele},{_id : 0, stage : 1, elements : 1}, function(err, result){
    Elements.find({stage : stage_ele}).distinct('elements', function(err, result){
      if(err){
        console.error(err);
      }
      if(result.length > 0){
        list_1.push(stage_ele);
        for(var i = 0; i < result.length; i++){
          list_1.push(result[i]);
        }
      }
      else{
        list_1 = [stage_ele];
      }
      console.log(list_1);
      resolve(list_1);
    });
  });
};

exports.getSubelements1byElements = function(ele_ele){
  return new Promise(function(resolve, reject){
    var list_2 = [];
    Elements.find({elements : ele_ele}).distinct('sub_elements1', function(err, result){
      if(err){
        console.err(err);
      }
      if(result.length > 0 && result[0] != ''){
        list_2.push(ele_ele);
        for(var i = 0; i < result.length; i++){
          list_2.push(result[i]);
        }
      }
      else{
        list_2 = [ele_ele];
      }
      console.log(list_2);
      resolve(list_2);
    });
  });
};

exports.getSubelements2byElements = function(ele_ele){
  return new Promise(function(resolve, reject){
    var list_3 = [];
    //console.log('변수값 : ' + ele_ele);
    Elements.find({sub_elements1 : ele_ele}).distinct('sub_elements2', function(err, result){
      if(err){
        console.err(err);
      }
      //console.log('쿼리 결과 : ' + result);
      if(result.length > 0 && result[0] != ''){
        list_3.push(ele_ele);
        for(var i = 0; i < result.length; i++){
          list_3.push(result[i]);
        }
      }
      else{
        list_3 = [ele_ele];
      }
      //console.log(list_3);
      resolve(list_3);
    });
  });
};

exports.getSubelements3byElements = function(ele_ele){
  return new Promise(function(resolve, reject){
    var list_4 = [];
    Elements.find({sub_elements2 : ele_ele}).distinct('sub_elements3', function(err, result){
      if(err){
        console.err(err);
      }
      if(result.length > 0 && result[0] != ''){
        list_4.push(ele_ele);
        for(var i = 0; i < result.length; i++){
          list_4.push(result[i]);
        }
      }
      else{
        list_4 = [ele_ele];
      }
      console.log(list_4);
      resolve(list_4);
    });
  });
};
