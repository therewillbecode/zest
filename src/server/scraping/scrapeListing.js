/**
 * Created by Tom on 07/03/2016.
 */
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

        if(response.statusCode !== 200){
            error = 'Http status code for ' + url + ' is ' + response.statusCode;
        }
        if (error) {
            console.log(error);
        }

        callback(error || null, response, html);
    });
}


exports.task = {
    getHtmlBody: getHtmlBody
};

