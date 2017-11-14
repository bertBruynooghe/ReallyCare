var casper = require('casper').create(),
system = require('system');
casper.start(system.env.THE_SITE);
casper.page.customHeaders = {
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
}; // set headers
console.log();

casper.then(function() {
this.fill('form[action="j_security_check"]', 
          { 'j_username': 'BertBruynooghe', 
            'j_password': system.env.PASSWORD }, 
          true);
});

casper.then(function(){
this.wait('2000', function(){
//this.capture('test2.png');
});
this.on("resource.received", function(resource){
if (resource.contentType == 'application/json' && resource.stage == "end") {
  //console.log(resource.url) ;
  var data = casper.evaluate(function(url){
      return __utils__.sendAJAX(url, "GET");
  }, resource.url);
  console.log(JSON.parse(data).lastSG.sg);
}
});
});

casper.run();