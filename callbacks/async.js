var net = require('net');
var port = 1702;
var server = net.createServer(startConnection);

function startConnection(connection) {
    console.log('Connection to %s open', port);
    connection.write('Hello?\r\n');
    connection.on('data', getData(connection));
}

function getData(connection) {
    return function(data){
        if (String(data).trim() != 'hello') {
            connection.write('ERROR\r\n');
        } else {
            connection.end('world\r\n');
            console.log('Connection to %s closed', port);
        }
    };
}

server.listen(port);