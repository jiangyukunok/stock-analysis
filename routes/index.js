var express = require('express');
var PythonShell = require('python-shell');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Testing http request & python-shell, spawn*/
router.get('/getData', function(req, res) {
  var pyshell = new PythonShell('public/python/say_hello.py', {mode:'json'});
  pyshell.on('message', function (message) {
    //console.log(message);
    res.send({
      sendData: message.greetings 
    });
  });

  pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished getting greetings');
  });

});

/* Get the stock data including timestamps and price data*/
router.get('/getStockData', function(req, res) {
  var pyshell = new PythonShell('public/python/get_stock_data.py', {mode: 'json'});
  pyshell.on('message', function (message) {
    console.log(message);
    res.send({
      sendStockData: message 
    });
  });

  pyshell.end(function (err) {
    if (err){
      console.log('<<<<<'+err+'>>>>>');
      throw err;
    }
    console.log('finished getting stock data');
  });

});

module.exports = router;
