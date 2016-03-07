/**
 * Created by Tom on 07/03/2016.
 */
var cheerio = require('cheerio');
var request = require('request');

var url = 'https://www.airbnb.co.uk/rooms/558390?s=1i60E9_R';

function scrapeListing(url, callback){
    request({
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }, function(err, response, html) {
        if (err) {
            return console.error(err);
        }
        callback(html)
    });
}


exports.task = {
    scrapeListing: scrapeListing
};

