/*jslint node, this, devel, fudge*/

require('dotenv').config();
var Spooky;
try {
    Spooky = require('spooky');
} catch (ignore) {
    Spooky = require('../lib/spooky');
}
var http = require('http');

http.createServer(function (ignore, response) {
    'use strict';
    console.log(process.env.THE_SITE);
    console.log(process.env.USERNAME);

    var spooky;
    spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            var e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start();
        spooky.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5');
        spooky.thenOpen(process.env.THE_SITE, function () {
            this.echo(this.getTitle());
        });

        // not sure why it can't be in the previous 'then'
        var username = process.env.USERNAME;
        var password = process.env.PASSWORD;
        spooky.then([{
            username: username,
            password: password
        }, function () {
            this.capture('node1.png');
            this.fill('form[action="j_security_check"]', {
                'j_username': username,
                'j_password': password
            },
                    true);
        }]);

        spooky.then(function () {
            var __utils__ = undefined;
            this.waitForResource(/ConnectViewerServlet/);
            this.capture('node2.png');

            //this.emit('hello', 'tada');
            //     // TOOD: check if we have to wait before calling the GET, 
            //     // and on which point we can do the GET

            this.on("resource.received", function (resource) {
                if (resource.contentType === 'application/json' && resource.stage == "end") {
                    console.log(resource.url);
                    //console.log(JSON.stringify(phantom.cookies, null, 2));
                    var data = this.evaluate(function (url) {
                        return __utils__.sendAJAX(url, "GET");
                    }, resource.url);
                    console.log('***' + JSON.parse(data).lastSG.sg);
                    console.log('***' + response);
                    this.emit('hello', 'tada');
                    //this.evaluate(function () {
                        //return 'tada';
                        //return JSON.parse(data).lastSG.sg;
                    //}));
                }
            });
        });

        spooky.run();
    });

    spooky.on('error', function (e, stack) {
        response.writeHead(500, {
            'Content-Type': 'text/html'
        });
        response.end('<h1>' + e + '</h1>' + stack);
    });


    // Uncomment this block to see all of the things Casper has to say.
    // There are a lot.
    // He has opinions.
    spooky.on('console', function (line) {
        console.log(line);
    });

    spooky.on('hello', function (greeting) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(greeting);
    });

    spooky.on('log', function (log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });
}).listen(8080);

console.log('Server started');