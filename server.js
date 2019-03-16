var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
var mqtt_client = mqtt.connect('tcp://rhserver.local:1883');

var port = process.env.PORT || 4500;
var cors = require('cors')
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'a5836c7d',
    apiSecret: 'GRoclfgRHcZTVXO4',
}, {debug: true});

app.use(express.static(__dirname + '/public'));
app.use(cors())
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.post('/sendSMS', (req, res) => {
  res.send(req.body);
  const text = req.body.text;
  nexmo.message.sendSms(
    '919743105734', '919743105734', text, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Optional: add socket.io -- will explain later
      }
    }
  );
 });


http.listen(port, function () {
  console.log('listening on *:' + port);
});