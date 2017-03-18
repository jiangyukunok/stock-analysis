var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/yjiang', function(req, res, next) {
  res.send('respond from yukun jiang!');
});

module.exports = router;
