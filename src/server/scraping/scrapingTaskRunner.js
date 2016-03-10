/**                         Created by Tom on 03/03/2016.
 *  Defines queue for webscraping tasks
 *
 */
//var request = require("request");
var async = require("async");

var scrapeLinks = require('./scrapeLinks.js').task.scrapeLinks; // imports individual scraping tasks to spawn
var scrapeListing = require('./scrapeListing.js').task.scrapeListing; // scrapes html body for individual listing


var url1 = 'https://www.airbnb.co.uk/rooms/558390?s=1i60E9_R';


v = scrapeLinks();

    function getLinks(location, callback){
        scrapeLinks(location, function(error, data){
            if (error){
                callback(error);
            } else{
                callback(null, data);
            }
        });
}


async.waterfall([
    function getLinks(callback){
       //  var links = scrapeLinks('dundee', callback);
      //  getHtmlBody(url1, callback);

    }
    ],
    function(err, result){
   //     console.log(result);
    });


