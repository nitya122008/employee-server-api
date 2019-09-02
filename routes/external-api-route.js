var express = require('express');
var router = express.Router();
var Request = require('request');
var parseString = require('xml2js').parseString;
var htmlParser = require('node-html-parser');


router.get('/getquote', function(req, res, next) {
    console.log('in route to retrieve quote');
    Request.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes",(error, response,body) => {
        if(error) {
            console.log(error);
        }
    var parsed = JSON.parse(response.body);
    res.status(201).json({quote : parsed});
    })
});

router.get('/getjoke', function(req, res, next) {
    Request.get("https://quotes.rest/qod",(error, response,body) => {
        if(error) {
            console.log(error);
        }
     //  console.log(response.body);
        var parsed = parseString(response.body, function(err,result) {
            //JSON.stringify(result);
            console.log(result);
            res.status(201).json({joke : JSON.stringify(result)});
        })
    })
});

/*router.get('/getjoke', function(req, res, next) {
    Request.get("https://icanhazdadjoke.com",(error, response,body) => {
        if(error) {
            console.log(error);
        }
       console.log(response.body);
        var root = htmlParser.parse(response.body);
        console.log(root);
    })
});*/

  
module.exports = router;
