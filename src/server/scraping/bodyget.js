/**
 * Created by Tom on 07/03/2016.
 */
var cheerio = require('cheerio');
var request = require('request');

var url1 = 'https://www.airbnb.co.uk/rooms/558390?s=1i60E9_R';

// returns html body of link
function getHtmlBody(url, callback){
    request({
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }, function(error, response, html) {
        if (error) {
            return console.error(error);
        }

        callback(error || null, html);
    });
}


exports.task = {
    getHtmlBody: getHtmlBody
};

