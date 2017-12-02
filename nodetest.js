/*jslint node, fudge*/

var https = require('https');

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', function (resp) {
    'use strict';
    var data = '';

    // A chunk of data has been recieved.
    resp.on('data', function (chunk) {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', function () {
        console.log(JSON.parse(data).explanation);
    });

}).on("error", function (err) {
    'use strict';
    console.log("Error: " + err.message);
});
