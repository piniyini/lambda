'use strict';
var http = require('https');
console.log('Loading function');

exports.handler = function(event, context) {

  console.log('start request');
  var options = {
    "method": "GET",
    "hostname": "ipecho.net",
    "port": null,
    "path": "/plain",
    "headers": {
      //"authorization": "Bearer SUPER_SECRET_KEY",
      "cache-control": "no-cache"
    }
  };
  
var req = http.request(options);
  req.on('response', function(res) {
    var chunks = [];
res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    
res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log("Got response: " + body.toString());
      // context.succeed(body.toString());
    });
  })
  
  req.on('error', function(e) {
    console.log("Got error: " + e.message);
    // context.done(null, 'FAILURE');
  });
  req.end();
  
console.log('end request');
}
