/*jslint this, fudge*/
/*global
  __utils__
*/
var casper = require('casper').create(),
    system = require('system'),
    site = system.env.THE_SITE,
    ajaxURL = site + "/patient/connect/ConnectViewerServlet";
casper.start(site);
console.log('Scraping ' + site);
casper.page.customHeaders = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
}; // set headers

casper.then(function login() {
    'use strict';
    //this.capture('casper1.png');
    this.fill('form[action="j_security_check"]',
            {'j_username': system.env.USERNAME, 'j_password': system.env.PASSWORD},
            true);
});

casper.then(function waitForReady() {
    'use strict';
    this.waitForResource(function (resource) {
        return (resource.url.indexOf(ajaxURL) >= 0);
    });
});

casper.then(function queryValues() {
    'use strict';
    console.log("***" + JSON.stringify(this.page.cookies));
    //console.log('***' + resource.url)
    var data = casper.evaluate(function (url) {
        return __utils__.sendAJAX(url, "GET");
    }, ajaxURL + '?cpSerialNumber=NONE&msgType=last24hours&requestTime=' + new Date().valueOf());
    console.log(JSON.parse(data).lastSG.sg.toString());
    return true;
});

casper.run();