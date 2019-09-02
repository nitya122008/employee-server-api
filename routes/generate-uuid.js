var express = require('express');
var uuid = require('shortid')
var router = express.Router();

/* GET uuid listing. */
router.get('/', function(req, res, next) {
  var generatedId = uuid.generate();
  res.json({uuid:generatedId});
});

module.exports = router;
