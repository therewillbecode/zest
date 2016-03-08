/**                         Created by Tom on 03/03/2016.
 *  Defines queue for webscraping tasks
 *
 */
//var request = require("request");
var async = require("async");

var scrapeLinks = require('./scrapeLinks.js').task.scrapeLinks; // imports individual scraping tasks to spawn
var getHtmlBody = require('./scrapeListing.js').task.getHtmlBody; // scrapes html body for individual listing


function getLinks(location, callback){
    scrapeLinks(location, function(error, data){
        if (error){
            callback(error);
        } else{
            callback(null, data);
        }
    });
}

var links = scrapeLinks('dundee', function(error, data){


    console.log(data)



});
var url1 = 'https://www.airbnb.co.uk/rooms/558390?s=1i60E9_R';

async.waterfall([
    function getLinks(callback){
         var links = scrapeLinks('dundee', callback);
      //  getHtmlBody(url1, callback);

    }
    ],
    function(err, result){
        console.log(result);
    });


