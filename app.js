var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var generate_uuid = require('./routes/generate-uuid');
var employee = require('./routes/employee-route');
var external = require('./routes/external-api-route')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use('/api/employees', employee);
app.use('/api/generate_uuid',generate_uuid);
app.use('/api/external',external);

module.exports = app;
