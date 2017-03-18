var express = require('express');
var PythonShell = require('python-shell');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getData', function(req, res) {
  var pyshell = new PythonShell('public/python/say_hello.py');
  pyshell.on('message', function (message) {
    console.log(message);
    res.send({
      sendData: message 
    });
  });

  pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');
  });

});

module.exports = router;
