var Client = require('simplecached').Client;
var client = new Client(11311);


var key = 'mykey';
var value = 'myvalue';


client.set(key, value, function(error) {});
client.get(key, function(error, value) {});

