// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = new Date();

  if (req.params.date !== undefined) {
    let timestamp = Date.parse(req.params.date);

    if (isNaN(timestamp)) {
      timestamp = parseInt(req.params.date);

      if (isNaN(timestamp)) {
        return res.json({ "error": "Invalid date" });
      }
    }

    date = new Date(timestamp);
  }

  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString(),
  });

});

// listen for requests :)
app.listen(3000, function () {
  console.log('Your app is listening on http://localhost:3000');
});
