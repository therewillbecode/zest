 //                                  Task for a given location
 //  1. Spawns process that runs casper script that scrapes all links for given location for all pages.
 //  2. Parses listing links and removes extraneous links
 //
 //

var async = require('async');
var child_process = require('child_process');

var winston = require('winston');

var casperjsPath = process.platform === "win32" ? "C:\\casperjs\\bin\\casperjs.exe" : "casperjs";

// log results of link scraping in file
winston.add(winston.transports.File, { filename: 'locationLinks.log' });

 // use regex to filter out links that are not listings
function filterLinks(data){
     var listingRegex = new RegExp("/rooms\\d.*", "g");  // match links that correspond to a listing
     return data.match(/rooms\/\d.*/g)
}

// logs results of scrapes for debugging purposes
function logScrapeResults(linkDump, filteredLinks, location) {
    winston.log('info', linkDump.split(" ") + ' Total links scraped for location: ' + location);
    // log number of link results for scrape
    if (filteredLinks.length === 0) {
        console.log('empty ');
        winston.log('info', 'no valid listing links found after regex filtering for location: ' + location)
    }
}

//gets all links from every page of search results of listings
function scrapeLinks(location, callback) {

    // stores any data emitted from the stdout stream of spawned casper process
     var processData = "";
     // stores any errors emitted from the stderror stream of spawned casper process
     var processError = "";
     // initialises casperjs link scraping script as spawned process
     var casperLocationScrape = child_process.spawn(casperjsPath, ['getLocationLinks.js ' + location]);


     casperLocationScrape.stdout.on('data', function (data) {
         processData += data.toString();
     });


     casperLocationScrape.stderr.on('data', function (err) {
         processError += err.toString();
     });

     casperLocationScrape.on("error", function (err) {
         processError = err.toString();
     });

     //once spawned casper process finishes execution call 'callback'
     casperLocationScrape.on('close', function (code) {
         console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);

         // filter out non valid listing links
         listingLinks = filterLinks(processData);

         // filter duplicates
         var uniqueLinks = [ ...new Set(listingLinks) ];

         logScrapeResults(processData, uniqueLinks, location);

         callback(processError || null, uniqueLinks);
     });
 }


// takes link as argument and scrapes the given listing
function scrapeListing(){

}


exports.task = {
    scrapeLinks: scrapeLinks
};


