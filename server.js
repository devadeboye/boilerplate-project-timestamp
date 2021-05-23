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

app.get("/api", (req, res) => {
  const date = new Date();
  const unix = Number(date);
  const utc = date.toGMTString();
  res.status(200).json(
    { unix, utc }
  );
});

app.get(
  "/api/:date",
  (req, res, next) => {
    let { date } = req.params;
    try {
      // check if date is a Number
      const dateAsNumber = Number(date);
      // if date is a string
      if (isNaN(dateAsNumber)) {
        date = new Date(date);
        if (date.toString() === "Invalid Date") {
          res.send(
            { error : "Invalid Date" }
          );
          return;
        }
        req.params.date = date;
        // if date is a number
      } else {
         date = new Date(dateAsNumber);
         req.params.date = date;
      }
      next();
    } catch (e) {
      res.status(404).json(
        { error: "Invalid Date" }
      )
    }
  },
  (req, res) => {
    let { date } = req.params;
    const unix = Number(date);
    const utc = date.toGMTString();
    res.status(200).json(
      { unix, utc }
    );
  }
);



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
