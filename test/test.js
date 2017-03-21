var PythonShell = require('python-shell');
var pyshell = new PythonShell('test.py', {mode: 'json'});


var data = [1,2,3,4,5,6,7,8,9];
// sends a message to the Python script via stdin
pyshell.send(data);

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message)
  console.log(message.elements);
  console.log(message.sum);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
  if (err) throw err;
  console.log('finished');
});
