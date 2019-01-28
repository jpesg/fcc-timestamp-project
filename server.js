// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//var router = express.Router();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
/*
Example
{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}
*/
app.get('/api/timestamp/:date_string?', function(req, res){
  var {date_string} = req.params;
  var date = new Date(date_string*1000);

  !(date_string) ? res.json({unix: new Date().getTime(), utc: new Date().toUTCString()}) : Date.parse(date) ? 
      res.json({unix: date.getTime(), utc: date.toUTCString()}) : res.json({unix: null, utc: 'Invalid Date'});
  
  
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});