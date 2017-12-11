/*jslint node, this, fudge*/
/*global
  __utils__
*/

"use strict";

var carelink = require('./carelink');

var http = require('http');

http.createServer(function (ignore, response) {
    var client = carelink.Client({username: process.env.USERNAME, password: process.env.PASSWORD});
    client.fetch(function callback(ignore, data) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        var message = '<strong>' + data.lastSG.sg + '</strong><br>';
        message += data.lastSG.datetime + '<br>';
        message += '<dl><dt>trend<dd>' + data.lastSGTrend + '</dl>';
        message += JSON.stringify(data, 2);
        response.end(message);
    });
}).listen(process.env.PORT);

console.log('Server started');