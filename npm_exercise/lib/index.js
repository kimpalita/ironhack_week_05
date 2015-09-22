'use strict';
var Client = require('simplecached').Client;
var client = new Client(11311);

var key = "hello";
var value = "good bye";

client.set(key, value, function(error) {
	console.assert(!error);
	client.get(key, function(error, everything) {
		//console.log(error);
		console.assert(!error);

		console.log('%s should be %s', value, everything);
		var value2 = "good bye";
		console.assert(value == value2);
		
		client.delete(key, function(error) {
			console.assert(!error);
			console.log('delete function');
				client.close(function(){
					console.assert(!error);
					console.log('cool?');
			});
		});
	});
});

//client.get(key, function(error, value) {
//	console.log('get error');
//});