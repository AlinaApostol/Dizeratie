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

function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

app.post('/api/document', function (req, res) {
    var bodyarr = [];
    var startTime = process.hrtime();
    
    req.on('data', function(chunk){
      bodyarr.push(chunk);
    })
    req.on('end', function(){
        // console.log( bodyarr.join('') );
        var ccdaDoc = bodyarr.join('');
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
                        var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
                        console.log('Time  : ' + elapsedSeconds + 'seconds');
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

    
})

var server = app.listen(7202, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://localhost:%s", port)

})