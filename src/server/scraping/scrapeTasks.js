 //                                  Task for a given location
 //  1. Spawns process that runs casper script that scrapes all links for given location for all pages.
 //  2. Parses listing links and removes extraneous links
 //
 //

var async = require('async');
var child_process = require('child_process');
var casperjsPath = process.platform === "win32" ? "C:\\casperjs\\bin\\casperjs.exe" : "casperjs";
var listingLinkRegex = new RegExp("\/rooms\/\d.*", "g");  // match links that correspond to a listing

 //async.series([])

 function scrapeLinks(location, callback) {

     var processData = "";
     var processError = "";

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

     casperLocationScrape.on('close', function (code) {
         console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);
         callback(processError || null, processData);
     });
 }

// takes link as argument and scrapes the given listing
function scrapeListing(){

}

 // use regex to filter out links that are not listings
function filterLinks(data, regex){
    return data.match(regex)
}


exports.task = {
    scrapeLinks: scrapeLinks,
    filterLinks: filterLinks
};


