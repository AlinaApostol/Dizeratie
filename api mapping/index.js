var express = require('express');
var cdaToFhir = require('cda-fhir');
var parser = require('./parser');
var _ = require('lodash');
var app = express();
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
var objToXML = require('object-to-xml');
var async = require('async');
var xmlserializer = require('xmlserializer');

app.use(cors());
app.use(bodyParser.xml({limit: '50mb'}));

var makeTransactionalBundle = function (bundle, base, patientId) {
    _.each(bundle.entry, function (value) {
        value.request = {
            'method': (value.resource.resourceType === 'Patient') ? 'PUT' : 'POST',
            'url': (value.resource.resourceType === 'Patient') ? 'Patient/' + patientId : value.resource.resourceType
        };
        value.base = base;
    });
    bundle.type = 'transaction';
    return bundle;
};

app.post('/api/document', function (req, res) {
    var ccdaDoc = objToXML(req.body);

    async.waterfall([
        function(callback) {
            fs.writeFile('trans.xml', ccdaDoc, 'utf-8', (err) => {  
                if (err) throw err;
                console.log('CCDA Document saved!');
                callback(null, fs);
            });
            
        },
        function(fs, callback) {
            var istream = fs.createReadStream('trans.xml', 'utf-8');
            istream
                .pipe(new parser.CcdaParserStream())
                .on('data', function (data) {
                    var bundle = JSON.stringify(makeTransactionalBundle(data), null, '  ');
                    res.send(bundle);
                })
                .on('error', function (error) {
                    done(error);
                });
        }
    ], function (err, result) {
        // result now equals 'done'
    });
})

var server = app.listen(7202, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://localhost:%s", port)

})