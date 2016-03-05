/**                         Created by Tom on 03/03/2016.
 *  Defines queue for webscraping tasks
 *
 */
//var request = require("request");
var async = require("async");
var scrapeLinks = require('./scrapeTasks.js').task.scrapeLinks; // imports individual scraping tasks to spawn

function getLinks(location, getLinksCallback){
    scrapeLinks(location, function(error, data){
        if (error){
            getLinksCallback(error);
        } else{
            getLinksCallback(null, data)
        }
    });
}
/*
getLinks('dundee', function(error, data){
    if(error){
        console.log(error)
    }
    else {
        console.log(data);
    }
});

*/

async.waterfall([
    function getLinks(callback){
         var links = scrapeLinks('dundee', callback);
    }
    ],
    function(err, result){
        console.log('hey')

        console.log(result);
        console.log('hey')
    });


