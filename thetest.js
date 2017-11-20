/* jshint node: true */
/* jshint browser: true */
"use strict";

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}
var http = require('http');

http.createServer(function (request, response) {
    var spooky = new Spooky({
        child: {transport: 'http'},
        casper: {logLevel: 'debug', verbose: true}
    }, function (err) {
        if (err) {
            var e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start('http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');
        spooky.then(function () {
            this.emit('hello', 'Hello, from ' + this.evaluate(function () {
                return document.title;
            }));
        });
        spooky.run();
    });

    spooky.on('error', function (e, stack) {
        response.writeHead(500, {'Content-Type': 'text/html'});
        response.end('<h1>'+e+'</h1>' + stack);
    });

    /*
    // Uncomment this block to see all of the things Casper has to say.
    // There are a lot.
    // He has opinions.
    spooky.on('console', function (line) {
    console.log(line);
    });
    */

    spooky.on('hello', function (greeting) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(greeting);
    });

    spooky.on('log', function (log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });
}).listen(8080);

console.log('Server started');