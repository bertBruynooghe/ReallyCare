var casper = require('casper').create(),
system = require('system');
casper.start(system.env.THE_SITE);
console.log('Scraping ' + system.env.THE_SITE);
casper.page.customHeaders = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
}; // set headers

casper.then(function() {
  this.capture('casper1.png');
  this.fill('form[action="j_security_check"]', 
            { 'j_username': system.env.USERNAME, 
              'j_password': system.env.PASSWORD }, 
            true);
});

casper.then(function(){
  this.waitForResource(/ConnectViewerServlet/);

  // TODO: check if we have to wait before calling the GET, 
  // and on which point we can do the GET

  this.on("resource.received", function(resource){
    if (resource.contentType == 'application/json' && resource.stage == "end") {
      console.log(resource.url) ;
      //console.log('headers: ' + JSON.stringify(resource.headers, null, 2));
      console.log(JSON.stringify(phantom.cookies, null, 2));
      var data = casper.evaluate(function(url){
          return __utils__.sendAJAX(url, "GET");
      }, resource.url);
      console.log(JSON.parse(data).lastSG.sg);
    }
  });
});

casper.run();