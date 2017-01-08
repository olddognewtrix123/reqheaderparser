// output is supposed to look like this:
// {"ipaddress":"169.253.194.1","language":"en-US","software":"Windows NT 6.1; WOW64"}
var express = require ('express');
var app = express();
var forwarded = require('forwarded-for'); // need to make sure you have $ npm install --save forwarded-for
var parseAcceptLanguage = require('parse-accept-language');
//var usrg = require('express-useragent');
var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 8080;

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {

    var addressInfo = forwarded(req, req.headers);  // need to make sure you have $ npm install --save forwarded-for
        // it will return something like this:
        // Forwarded { ip: '169.253.194.1', secure: true, port: 443 }
    var address = addressInfo.ip; //stripping out the ip from Forwardedfor
    console.log(address);
    
    var pal = parseAcceptLanguage(req);
    var palpal = pal[0,0].value;
    console.log(palpal);

    var source = req.headers['user-agent'];
    //console.log(source); // "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
    //console.log(JSON.stringify(source));
    var strungSource = JSON.stringify(source)
    var strungSourceArr = strungSource.split(" ");
    //console.log(strungSourceArr);
    var newString = strungSourceArr[1]+" "+strungSourceArr[2]+" "+strungSourceArr[3]+" "+strungSourceArr[4];
    //console.log(newString);
    var updatedString = newString.substring(1, newString.length-1);
    console.log(updatedString)
    var responseObject = ({"ipaddress": address, "language": palpal, "software":updatedString });

    res.send(responseObject);
});

//app.listen(8080, function () {
//    console.log("Listening on port 8080")
//});

app.listen(app.get('port'), function() {  // code from fcc post https://forum.freecodecamp.com/t/solved-need-heroku-help-have-read-other-threads-git-to-heroku-not-working/46737/2
  console.log('Node app is running on port', app.get('port'));
});

