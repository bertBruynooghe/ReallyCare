/*jslint node, this, fudge*/

var Spooky,
    port = process.env.PORT || 8080;
try {
    Spooky = require('spooky');
} catch (ignore) {
    Spooky = require('../lib/spooky');
}
var http = require('http');

http.createServer(function (ignore, response) {
    'use strict';

    var spooky,
        username = process.env.USERNAME,
        password = process.env.PASSWORD,
        site = process.env.THE_SITE;
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
        spooky.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) ' +
                'AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 ' +
                'Safari/604.3.5');
        spooky.thenOpen(site, function () {});
        spooky.then([{username: username, password: password}, function () {
            var casper = this;
            //casper.capture('node1.png');
            casper.fill('form[action="j_security_check"]', {
                'j_username': username,
                'j_password': password
            }, true);
        }]);

        spooky.then([{site: site}, function () {
            var casper = this,
                __utils__ = undefined;
            var ajaxURL = site + "/patient/connect/ConnectViewerServlet";

            casper.waitForResource(function (resource) {
                if (resource.url.indexOf(ajaxURL) >= 0) {
                    console.log('***' + resource.url)
                    var data = casper.evaluate(function (url) {
                        return __utils__.sendAJAX(url, "GET");
                    }, ajaxURL + '?cpSerialNumber=NONE&msgType=last24hours&requestTime=' + new Date().valueOf());
                    casper.emit('dataFound',
                            JSON.parse(data).lastSG.sg.toString());
                    return true;
                }
                return false;
            }, function (ignore) {});
        }]);

        spooky.run();
    });

    spooky.on('error', function (e, stack) {
        response.writeHead(500, {
            'Content-Type': 'text/html'
        });
        response.end('<h1>' + e + '</h1>' + stack);
    });

    spooky.on('console', function (line) {
        console.log(line);
    });

    spooky.on('dataFound', function (data) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    });

    // spooky.on('log', function (log) {
    //     if (log.space === 'remote') {
    //         console.log(log.message.replace(/ \- .*/, ''));
    //     }
    // });
}).listen(port);

console.log('Server started');