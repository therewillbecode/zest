/**
 * Created by Tom on 07/03/2016.
 */
var request = require('request');

var url1 = 'https://www.airbnb.co.uk/rooms/558390?s=1i60E9_R';

// html  Listing
function HttpRequestPromise(url) {

    return new Promise((resolve, reject) => {

        request({
            url: url,
            headers: {
                'User-Agent': 'request'
            }
        }, (error, response, html) => {

            var statusCode = response.statusCode;

            if (error)
                reject({errors});
            else
                resolve({error, statusCode, response, html});
        });
    });
}


// Usage
function scrapeListing(location){
    HttpRequestPromise('http://www.airbnb.co.uk').then((result) => {
        // result.code
        // result.uniqueLinks
        // console.log(result)
        console.log(result.statusCode)

    }, (result) => {
        //   console.log('tt');
        console.log(result);
        //  console.log(result.code);
        // result.code
        // result.errors
    }).then( (result) => {
        console.log('got body');
    });
}


exports.task = {
    scrapeListing: scrapeListing
};

