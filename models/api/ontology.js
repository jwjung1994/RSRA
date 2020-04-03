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
/* 자산 조회 쿼리 */
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
        //var list = [];
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


exports.findHumanSR = function findHumanSR(apt_case){
    return new Promise(function(res){
        var aList = new Array();
        var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?sr ?details (count(?sr) as ?cnt) WHERE { apt:"+ apt_case +" apt:use ?ele. ?avc rdfs:subClassOf+ apt:Attack_Vector. ?ele rdf:type ?avc. ?avc apt:damage_the_person ?as. ?as apt:express_person ?pe. ?pe apt:is_stakeholder_of ?sys. ?sys apt:is_related_system_to ?ac. ?sg apt:is_set_to ?ac. ?sr apt:is_required ?as. ?sr rdfs:comment ?details. FILTER NOT EXISTS {?ele rdf:type ?c. ?c rdfs:subClassOf+ ?avc.} } GROUP BY ?sr ?details ORDER BY ?sr"
        client.query(query, function(error, result){
            var list = [];
            list = result.results.bindings;
            for(var i in list){
                var info = new Object();
                info.sr = list[i].sr.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                info.detail = list[i].details.value;
                info.num = list[i].cnt.value;

                aList.push(info);
            }
            //console.log(aList);
            res(aList);
        });
    });
}

exports.findTechSR = function findTechSR(apt_case){
    return new Promise(function(res){
        var aList = new Array();
        var query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX apt: <http://www.semanticweb.org/test2#>" +
            "SELECT ?sr ?sg ?details (count(?sr) as ?cnt) WHERE { apt:"+ apt_case +" apt:use ?ele. ?avc rdfs:subClassOf+ apt:Attack_Vector. ?ele rdf:type ?avc. ?avc apt:damage_the_asset ?as. ?as apt:is_related_system_to ?sys. ?ac rdf:type apt:Asset_Category. ?sys apt:is_related_system_to ?ac. ?sg apt:is_set_to ?ac. ?sr apt:is_required ?ac. ?sg apt:suggest_the_security_requirements ?sr. ?sr rdfs:comment ?details. FILTER NOT EXISTS {?ele rdf:type ?c. ?c rdfs:subClassOf+ ?avc.} } GROUP BY ?sr ?sg ?details ORDER BY ?sr"

        client.query(query, function(error, result){
            var list = [];
            list = result.results.bindings;
            for(var i in list){
                var info = new Object();

                info.sr = list[i].sr.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                info.securitygoal = list[i].sg.value.replace(/http\:\/\/www.semanticweb.org\/test2\#/g,'');
                info.detail = list[i].details.value;
                info.num = list[i].cnt.value;       
                      
                //if (i > 0){
                    // 바로 전 겹치는게 있으면
                    //if(aList.reverse().find(obj => obj.sr == info.sr)){
                    if(i > 0 && (aList[aList.length - 1].sr == info.sr)){
                        //var lastObj = aList.reverse().find(obj => obj.sr == info.sr);
                        //console.log(lastObj.sr);
                        var lastlist = aList.pop();
                        info.securitygoal = info.securitygoal+","+ lastlist.securitygoal;
                        info.num = String(Number(info.num) + Number(lastlist.num));
                        //console.log(info);
                    }
                //}  
                              
                aList.push(info);
            }
            res(aList);
        });
    });
}