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
            console.log(data + 'data');
            getLinksCallback(null, data)
        }
    });
}

getLinks('dundee');
/*
async.waterfall([
    function getLinks(callback){
         var links = scrapeTasks.task.scrapeLinks('dundee');
        callback(null, links);
    }
    ],
    function(err, result){
        console.log(result);
    });


*/