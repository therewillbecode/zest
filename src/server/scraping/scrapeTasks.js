 //                                  Task for a given location
 //  1. Spawns process that runs casper script that scrapes all links for given location for all pages.
 //  2. Parses listing links and removes extraneous links
 //  3. Logs scrape metadata for given location
 //

var async = require('async');
var child_process = require('child_process');

var winston = require('winston');

var casperjsPath = process.platform === "win32" ? "C:\\casperjs\\bin\\casperjs.exe" : "casperjs";

// log results of link scraping in file
winston.add(winston.transports.File, { filename: 'locationLinks.log' });

 function regexMatchLink(link){
     var reGeX = /rooms\/\d.*/g;
     return link.match(reGeX)
 }

 // use regex to filter out links that are not listings
function filterLinks(dataArray){
  //  console.log(dataArray)

    var filtered = dataArray.filter(regexMatchLink);
  return filtered
}

// logs results of scrapes for debugging purposes
function logScrapeResults(linkDump, filteredLinks, location) {
    var totalNumberLinks = linkDump.length;
    var totalFilteredLinks = filteredLinks.length;
    var logLevel = 'info';

    // log warning if number of filtered links is 0
    if (filteredLinks.length === 0) {
        logLevel = 'warn';
    }

    winston.log(logLevel, {
        location: location, totalFilteredLinks :totalFilteredLinks, totalNumberLinks : totalNumberLinks
    });

}

//gets all links from every page of search results of listings
function scrapeLinks(location, callback) {

    // stores any data emitted from the stdout stream of spawned casper process
     var processData = "";
     // stores any errors emitted from the stderror stream of spawned casper process
     var processError = "";
     // initialises casperjs link scraping script as spawned process
     var casperLocationScrape = child_process.spawn(casperjsPath, ['getLocationLinks.js ' + location]);


     casperLocationScrape.stdout.on('data', function onScrapeProcessStdout(data) {
         processData += data.toString();
         console.log(data.toString())
     });

     casperLocationScrape.stderr.on('data', function onScrapeProcessError(err) {
         processError += err.toString();
     });

     casperLocationScrape.on("error", function onScrapeProcessError(err) {
         processError = err.toString();
     });


    //once spawned casper process finishes execution call 'callback'
    casperLocationScrape.on('close', function onScrapeProcessExit(code) {
        processData = processData.toString().split(",");

         console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);
      //  console.log(processData);
         // filter out non valid listing links
         listingLinks = filterLinks(processData);
        console.log(listingLinks);
         // filter duplicates
         var uniqueLinks = [ ...new Set(listingLinks) ];

         logScrapeResults(processData, uniqueLinks, location);

         callback(processError || null, uniqueLinks);
    });
 }

exports.task = {
    scrapeLinks: scrapeLinks
};


