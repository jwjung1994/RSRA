var Cases = require('./case_schema');
var Promise = require('bluebird');
var Ontology = require('./ontology');

exports.getSimilarCase = function(newCase) {
  return new Promise(function(res) {
    Cases.find(function(err, apt_cases) {
      if (err) {
        console.log(err);
      }
      var cases = [];
      cases = apt_cases;
      var new_case = newCase;
      //console.log(cases);

      var plist = []; //promise list
      var APT_phase = ['Reconnaissance_phase', 'Delivery_phase', 'Initial_intrusion_phase', 'Connecting_to_server_phase', 'Lateral_movement_phase', 'Information_gathering_phase', 'Completing_the_attack_phase'];

      var results = {};

      //console.log(results);
      /*  2020-01-20 주석처리 ontology 부분
      Ontology.findSuperClasses2(new_case).then(function(result0) {
        var plist = [];

        for (var c in cases) {
          var Case = JSON.parse(JSON.stringify(cases[c].elements));
          //console.log(c);
          //console.log(Case);
          var p = Ontology.findSuperClasses2(Case);
          plist.push(p);
        }
        */
        Promise.all(plist).then(values => {

          for (var c in cases) {
            results[cases[c].op_name] = 0;
            /*
                                  var Case = cases[c];
                                  //newCase와 cases 비교
                                  for(var i = 0; i < APT_phase.length; i++){
                                      //console.log(new_case[APT_phase[i]]);
                                      if((new_case[APT_phase[i]]) && (Case.elements[APT_phase[i]])){
                                          var list = new_case[APT_phase[i]];
                                          var list2 =Case.elements[APT_phase[i]];
                                          for(var j = 0; j < list.length; j++){
                                              for(var k = 0; k < list2.length; k++){
                                                  if(list2[k] == list[j]){
                                                      results[cases[c].op_name]++;
                                                  }
                                              }
                                          }
                                      }
                                  }
            */
          }
          //console.log(result0);
          var keys = Object.keys(results);

          for (var i in values) {
            var j = values[i];
            for (var k in j) {
              var obj = j[k];
              var key = Object.keys(obj);
              var ele = key[0];
              var cla = obj[ele];
              for (var l in result0) {
                var m = result0[l];
                var key2 = Object.keys(m);
                var ele2 = key2[0];
                var cla2 = m[ele2];
                if (ele == ele2) {
                  results[keys[i]]++;
                } else if (cla == cla2) {
                  results[keys[i]] += 0.5;
                }
              }
            }
          }
          var max = 0;
          var max_name;
          for (var n in results) {
            if (results[n] > max) {
              max = results[n];
              max_name = n;
              //console.log(results[n]);
            }
          }
          var result;
          for (var c in cases) {
            if (cases[c].op_name == max_name)
              result = cases[c].case_type;
          }
          console.log(results);

          res(result);
          //res(values); //return
        });
  //    });   2020-01-20 주석처리 ontology 부분
    });
  });
};

exports.getCases = function() {
  return new Promise(function(res) {
    Cases.find(function(err, apt_cases) {
      if (err) {
        console.log(err);
      }
      var cases = [];
      cases = apt_cases;
      var elements = cases[0].elements;
      //console.log(elements);
      res(elements);
    })
  });
}; //test - find all cases
