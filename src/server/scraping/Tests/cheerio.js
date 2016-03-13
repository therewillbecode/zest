/**
 * Created by Tom on 13/03/2016.
 */
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

url = 'https://www.airbnb.co.uk/rooms/10703226?s=40i91OEL';

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type' : 'application/x-www-form-urlencoded'
};

request({
    headers,
    method: 'GET',
    url: 'https://www.airbnb.co.uk/rooms/10703226?s=40i91OEL'
}, function(err, response, body) {
    if (err) return console.error(err);


    var $ = cheerio.load(body);

    var title = $('div.js-details-column>div').contents(":not(:empty)").first().text();
    console.log(title);



});