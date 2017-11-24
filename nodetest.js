/*jslint node, this, fudge*/

var http = require('http'),
    port = process.env.PORT || 8080;

http.createServer(function (ignore, response) {
    "use strict";
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(port);

console.log('Server started');