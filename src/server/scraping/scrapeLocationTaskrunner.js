/**                         Created by Tom on 03/03/2016.
 *  Defines queue for webscraping tasks
 *
 */
//var request = require("request");
var async = require("async");

var scrapeLinks = require('./scrapeTasks.js').task.scrapeLinks; // imports individual scraping tasks to spawn
var filterLinks = require('./scrapeTasks.js').task.filterLinks; // imports individual scraping tasks to spawn


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
         var links = scrapeLinks('dundee', callback);
    }
    ],
    function(err, result){
        console.log(filterLinks(result));
    });


