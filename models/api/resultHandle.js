var Cases = require('../cases'); // mongoDB 케아스 조회하기 위해
var Promise = require('bluebird');

exports.compareTable = function compareTable(webTable, result){
  return new Promise(function(res){
    var tablescore =[];
    //console.log(webTable);        // 웹테이블
    //console.log(result.caseindex); //몽고디비 케이스 인덱스
    //케이스 인덱스에 따른 요소 호출
    Cases.find({caseindex : result.caseindex},{attack_pattern : 1, _id : 0}, function(err, pattern){
      if(err){
        console.log(err);
      }
      else{
        if((pattern[0]['attack_pattern'].length > 0) && (webTable.length > 0)){
          var eleSimilarity = elementSimilarity(webTable, pattern[0]['attack_pattern']);
          var patSimilarity = patternSimilarity(webTable, pattern[0]['attack_pattern']);
          //console.log('================================');
          //console.log('요소 유사도 : ' + eleSimilarity);
          //console.log('패턴 유사도 : ' + patSimilarity);

          tablescore.push(eleSimilarity);
          tablescore.push(patSimilarity);
        }
        //console.log(tablescore);
        res({
          score : tablescore,
          tle : pattern[0]
          });
      }
    });
  });
};

exports.getCaseIndex = function getCaseIndex(table){
  return new Promise(function(res){
    Cases.find({},{_id : 0, caseindex : 1}, function(err, result){
      if(err){
        console.log(err);
      }
      else{
        res(result);
      }
    });
  });
};

// 요소 유사도 계산
function elementSimilarity(table, DB){
  var TABLE_ROW_CNT = table.length, DB_ROW_CNT = DB.length, VECTOR_SIZE = 6;
  var top_score = 0;  //1 : n의 관계에서 제일 높은 점수
  var score = 0;      //현재 행에 대한 점수
  var scoreList = []; //입력한 table의 각 행의 점수 리스트
  for(var i = 0; i < TABLE_ROW_CNT; i++){
    top_score = 0;
    for(var j = 0; j < DB_ROW_CNT; j++){
      if(table[i].phase == DB[j].phase)
        score += 1;
      if(table[i].element == DB[j].element)
        score += 1;
      if(table[i].sub_element1 == DB[j].sub_element1)
        score += 1;
      if(table[i].sub_element2 == DB[j].sub_element2)
        score += 1;
      if(table[i].sub_element3 == DB[j].sub_element3)
        score += 1;
      if(table[i].instance == DB[j].instance)
        score += 1;
      score /= VECTOR_SIZE;
      if(top_score <= score)
        top_score = score;
      score = 0;
    }
    //console.log('탑스코어값 : '+ top_score);
    scoreList.push(top_score);
  }
  var sum = 0.0;
  for(var i = 0; i < scoreList.length; i++)
    sum += scoreList[i];
  //console.log('배열 값 합계 : ' + sum);
  //console.log('평균 : ' + sum / TABLE_ROW_CNT);
  return sum / TABLE_ROW_CNT;
}

// 패턴 유사도 계산
function patternSimilarity(table, DB){
  var TABLE_ROW_CNT = table.length;
  var DB_ROW_CNT = DB.length;
  var correctCount = 0;

  /*
  console.log('웹입력 테이블 : ');
  console.log(table);
  console.log('-------------------------------------------------------');
  console.log('DB 테이블 : ');
  console.log(DB);
  console.log(DB.length);
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  */
  //console.log(TABLE_ROW_CNT);
  //console.log(DB_ROW_CNT);
  for(var i = 0; i < TABLE_ROW_CNT; i++){
    for(var j = 0; j < DB_ROW_CNT; j++){
      if((table[i].phase == DB[j].phase) && (table[i].element == DB[j].element) && (table[i].sub_element1 == DB[j].sub_element1) && (table[i].sub_element2 == DB[j].sub_element2) && (table[i].sub_element3 == DB[j].sub_element3) && (table[i].instance == DB[j].instance))
        correctCount += 1;
    }
  }
  var result = correctCount / TABLE_ROW_CNT;
  return result;
}
