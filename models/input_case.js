var Elements = require('./elements');
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

exports.getSubelementsbyElements = function(ele_ele){
  return new Promise(function(resolve, reject){
    var list_2 = [];
    Elements.find({elements : ele_ele}).distinct('sub_elements', function(err, result){
      if(err){
        console.err(err);
      }
      //console.log(result);
      //console.log('>>> result길이 : ' + result.length);
      /* result가 ''이면 list_2[0]에 ele_ele 넣어서 리턴
       ''가 아니면 [1]부터 요소 넣고 리턴*/
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
