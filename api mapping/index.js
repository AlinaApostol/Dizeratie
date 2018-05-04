var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

app.use(cors());
app.use(bodyParser.xml({limit: '50mb'}));

app.post('/api/document', function (req, res) {
   var ccdaDoc = req.body;
   res.send(req.body);
})

var server = app.listen(7202, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://localhost:%s", port)

})