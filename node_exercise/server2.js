'use strict';

var net = require('net');
var port = 11311;
var store = {};
var util = require('util');


var server = net.createServer(function(connection) {

    console.log('Connection open');
    connection.write("Enter your string:\r\n");
    connection.on('data', function(data) {

        var input_string = String(data).trim().split(" ");
        var command = input_string[0];
        var key = input_string[1];
        //if (!key){
            //connection.write("ERROR no key was set\r\n");
            //return;
        //}
        //if ( input_string[0] != "set" && input_string[0] != "get" && input_string[0] != "delete") {
            //connection.write("ERROR\r\n");
        switch (command) {

            case "set":
                var value = input_string.slice(2).join(" ");
                if (value){
                    store[input_string[1]] = value;
                    connection.write("=>STORED\r\n");
                } else {
                    connection.write("=>NOT STORED\r\n");
                }
                break;

            case "get":
                if (input_string.length == 2 && key in store){
                    connection.write(util.format("VALUE %s %s\r\n", key, store[key]));
                    //connection.write("=>VALUE %s %s\r\n", key, value );
                } else {
                    connection.write("=>NOT FOUND\r\n");
                }
                break;

            case "delete":
                if (input_string.length == 2 && key in store){
                    delete store[key];
                    connection.write("DELETED\r\n");
                    //connection.write("=>VALUE %s %s\r\n", key, value );
                } else {
                    connection.write("=>NOT FOUND\r\n");
                }
                break;

            default:
                connection.write("ERROR\r\n");
                //connection.end();
                //console.log("Connection closed");  
        }
    });
});
server.listen(port);