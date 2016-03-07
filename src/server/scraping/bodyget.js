/**
 * Created by Tom on 07/03/2016.
 */
var cheerio = require('cheerio');
var request = require('request');

var t = 'https://www.airbnb.co.uk';

var options = {
    url: t,
    headers: {
        'User-Agent': 'request'
    }
};

function makeRequest(){
    request(options, function(err, response, body) {
        if (err) return console.error(err);
        console.log(body);
        var info = $(this).body;
        console.log(info);
    });
}

//console.log