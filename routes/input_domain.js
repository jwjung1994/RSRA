var express = require('express');
var router = express.Router();
var domainDB = require('../modules/DB_domain');

/* GET home page. */
router.get('/', function(req, res, next) {
    domainDB.getAssets().then(function(results){
        console.log(results);
        res.render('input_domain', { title: 'RSRA Input Domain Knowledge' });
    })
});

module.exports = router;
