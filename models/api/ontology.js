const SparqlClient = require('../client');
var Promise = require('bluebird');

var endpoint = 'http://localhost:3030/ds/query';
const client = new SparqlClient(endpoint);
//==========================================================================================
/* case list 불러오는 쿼리   */
exports.findCaseLists = function findCaseLists(){
  return new Promise(function(res){
    var result = [];
    var list = [];
    var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
        "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
        "PREFIX apt: <http://www.semanticweb.org/test2#>" +
        "SELECT ?cases WHERE { ?cases rdf:type apt:APT_attack_cases.}";
    client.query(query, function(error, results){
        result = results.results.bindings;
        for(var i = 0; i < result.length; i++){
          var caseIndex = result[i].cases.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
          list.push(caseIndex);
          res(list);
        }
    });
  });
};
/* 공격단계부터 그 바로 하위 클래스까지만
exports.findCases_exp2 = function findCases_exp2(){
  return new Promise(function(res){
    var list = [];
    var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
        "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
        "PREFIX apt: <http://www.semanticweb.org/test2#>" +
        "SELECT ?phase ?sub1 ?instance WHERE { apt:APTC_01 apt:use+ ?instance. ?instance rdf:type ?sub1. ?phase rdfs:subClassOf apt:APT_attack_elements. ?sub1 rdfs:subClassOf ?phase.} order by desc(?phase)";
    client.query(query, function(error, results){
        list = results.results.bindings;
        res(list); //return
    });
  });
};
*/
/* 공격단계부터 인스턴스 끝까지*/
exports.loadSpecificCase = function loadSpecificCase(caseIndex){
  return new Promise(function(res){
    var list = [];
    var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
        "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
        "PREFIX apt: <http://www.semanticweb.org/test2#>" +
        "SELECT ?phase ?sub1 ?sub2 ?sub3 ?sub4 ?instance WHERE { apt:" + caseIndex + " apt:use+ ?instance. ?phase rdfs:subClassOf apt:APT_attack_elements. ?instance rdf:type ?sub1. ?sub1 rdfs:subClassOf ?phase. optional { ?instance rdf:type ?sub2. ?sub2 rdfs:subClassOf ?sub1. optional { ?instance rdf:type ?sub3. ?sub3 rdfs:subClassOf ?sub2. optional { ?instance rdf:type ?sub4. ?sub4 rdfs:subClassOf ?sub3 } } } } order by desc(?phase)";
    client.query(query, function(error, results){
        list = results.results.bindings;
        res(list);
    });
  });
};
//==========================================================================================
/*
exports.findCases = function findCases(apt_case){
    return new Promise(function(res){
        var list = [];
        var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "select ?y ?x where { apt:"+ apt_case +" apt:use+ ?x. ?y rdfs:subClassOf apt:APT_attack_elements. ?x rdf:type ?y. FILTER (?y != owl:NamedIndividual).} order by desc(?y)";
        client.query(query, function(error, results){
            list = results.results.bindings;
            res(list); //return
        });
    });
};


//ele -> element, cla -> highLevelClass
function findSuperClass(element, highLevelClass){
    return new Promise(function(res){
        var list = [];
        //console.log(element);
        //console.log(highLevelClass);
        var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "select ?c where { apt:" + element + " rdf:type ?c. ?c rdfs:subClassOf+ apt:" +  highLevelClass + ". FILTER NOT EXISTS { apt:" + element + " rdf:type ?c1. ?c1 rdfs:subClassOf+ ?c.}}";
        client.query(query, function(error, results){
            list = results.results.bindings;
            //console.log(list);
            //console.log(element);
            if(list.length == 0)
            {
                var obj = {};
                obj[element] = 'none'
                res(obj);
            }else{
                var obj = {};
                obj[element] = list[0].c.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                res(obj); //return
            }
        });
    })
};


exports.findSuperClasses = function findSuperClasses(elements){
    return new Promise(function(res){
        var list = [];
        //console.log(list);
        list = elements;
        //console.log(list);
        var plist = [];
        for(var i in list){
          // y : ele_phase -> cla, x : phase_eles -> ele
            var cla = list[i].y.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
            var ele = list[i].x.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
            var p = findSuperClass(ele, cla);
            plist.push(p);
        }
        Promise.all(plist).then(values => {
            //console.log(values);
            res(values); //return
        });
    });
};

exports.findSuperClasses2 = function findSuperClasses2(elements){
    return new Promise(function(res){
        var list = [];
        list = elements;
        //console.log(list);
        var plist = [];
        for(var i in list){
            var cla = i;
            var ele_list = [];
            ele_list = list[i];
            for(var j in ele_list){
                var ele = ele_list[j];
                var p = findSuperClass(ele, cla);
                //console.log(ele);
                //console.log(cla);
                plist.push(p);
            }
        }
        Promise.all(plist).then(values => {
            //console.log(values);
            res(values); //return
        });
    });
};

exports.addList = function addList(list, list2){
    return new Promise(function(res){
        var list0 = list;
        var list00 = list2;
        for(var r in list0){
            if(!list00[r]){
                list00[r] = 1;
            }else{
                list00[r] += 1;
            }
        }
        //console.log(list2);
        res(list00);
    })

};
*/
/*
for(r in res1){
    if(!aList[r]){
        aList[r] = 1;
    }else{
        aList[r] += 1;
    }
}
*/
/*
exports.recommnedSR = function recommendSR(aList){
    return new Promise(function(rest){
        //자산 중 위험도가 높은 자산 5개를 고름
        //고른 자산을 통해 보안 요구사항 검색
    });
};

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) == JSON.stringify(obj)) {
            return true;
        }
    }
    return false;
}
*/

exports.findAssetAVP = function findAssetAVP(apt_case) {
    return new Promise(function (res) {
        var list = [];
        var aList = {};
        var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?ele ?avc ?asdf WHERE {apt:"+ apt_case +" apt:use ?ele. ?avc rdfs:subClassOf+ apt:Attack_Vector. ?ele rdf:type ?avc. ?avc apt:damage_the_person ?as. ?as apt:express_person ?aa. ?aa apt:is_stakeholder_of ?asdf}";
        client.query(query, function (error, results) {
            list = results.results.bindings;
            //console.log(list);
            for(var i in list){
                //var avc = list[i].avc.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                var asdf = list[i].asdf.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');

                if(!aList[asdf]){
                    aList[asdf] = 1;
                }
                else{
                    aList[asdf] += 1;
                }
            }
            res(aList);
        });
    });
}

exports.findAssetAVT = function findAssetAVT(apt_case){
    return new Promise(function(res) {
        var list = [];
        var aList = {};
        var query1 = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?ele ?avc ?aa WHERE { apt:" + apt_case + " apt:use ?ele. ?avc rdfs:subClassOf+ apt:Attack_Vector. ?ele rdf:type ?avc. ?avc apt:damage_the_asset ?as. ?as apt:is_related_system_to ?aa FILTER NOT EXISTS {?ele rdf:type ?c. ?c rdfs:subClassOf+ ?avc.} }";

        client.query(query1, function (error, results1) {
            var list1 = [];
            list1 = results1.results.bindings;
            for (var i in list1) {
                //var avc = list[i].avc.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                var aa = list1[i].aa.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g, '');

                if (!aList[aa]) {
                    aList[aa] = 1;
                } else {
                    aList[aa] += 1;
                }
            }
            //console.log(aList);
            res(aList);
        });
    });
};

exports.findAssetP = function findAssetP(apt_case){
    return new Promise(function(res){
        var list = [];
        var aList = {};
        var query2 = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?purpose ?asset Where {   apt:"+ apt_case +" apt:has_purpose ?purpose. ?purpose apt:target ?aa. ?aa apt:is_related_system_to ?asset.}";
        client.query(query2, function(error, results2){
            var list2 = [];
            list2 = results2.results.bindings;
            for(var i in list2){
                //var avc = list[i].avc.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                var aa = list2[i].asset.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');

                if(!aList[aa]){
                    aList[aa] = 1;
                }else{
                    aList[aa] += 1;
                }
            }
            //console.log(aList);
            res(aList);
        });
    });
}

exports.findAssetV = function findAssetV(apt_case){
    return new Promise(function(res){
        var list = [];
        var aList = {};
        var query2 = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?asset where {   apt:"+ apt_case +" apt:use ?vul. ?vul rdf:type apt:Human_Vulnerability_Category. ?vul apt:threaten ?h. ?h apt:express_person ?p. ?p apt:is_stakeholder_of ?asset }";
        client.query(query2, function(error, results2){
            var list2 = [];
            list2 = results2.results.bindings;
            for(var i in list2){
                //var avc = list[i].avc.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                var aa = list2[i].asset.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');

                if(!aList[aa]){
                    aList[aa] = 1;
                }else{
                    aList[aa] += 1;
                }
            }
            //console.log(aList);
            res(aList);
        });
    });
}
