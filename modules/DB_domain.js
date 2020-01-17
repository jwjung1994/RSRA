var mysql = require('mysql');
var Promise = require('bluebird');

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1357945',
    database: 'rsra'
});

exports.getAssets = function(){
  return new Promise(function (res) {
      var sql = 'select * from assets;'; //sql query
      pool.getConnection(function (err, conn) {
          if(err){
              console.log(err);
          }else{
              conn.query(sql, function (err, results) {
                  conn.release();
                  if(err){
                      console.log(err);
                  }else{
                      var assets = [];
                      assets = results;
                      res({results});
                  }
              })
          }
      })
  }) ;
};