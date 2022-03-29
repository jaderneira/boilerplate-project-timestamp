// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api", function (req, res) {
  const theDate = new Date()
  
  res.json({
    unix: Date.parse(theDate),
    utc: theDate.toUTCString()
  });
});

app.get("/api/?:date", function (req, res) {
  let response;
  const { date } = req.params

  const theDate = isNaN(date) ? new Date(date) : new Date(+date);

  if(theDate.toString() == 'Invalid Date') 
    response = {error: theDate.toString()}
  else
    response = {
      unix: Date.parse(theDate),
      utc: theDate.toUTCString()
    }  
  res.json(response);

});
  


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
