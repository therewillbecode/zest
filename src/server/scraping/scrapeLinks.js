 //                                  Task for a given location
 //  1. Spawns process that runs casper script that scrapes all links for given location for all pages.
 //  2. Parses listing links and removes extraneous links
 //  3. Logs scrape metadata for given location
 //
'use strict'

var child_process = require('child_process');

var winston = require('winston');
var casperjsPath = process.platform === "win32" ? "C:\\casperjs\\bin\\casperjs.exe" : "casperjs";


// log results of link scraping in file
winston.add(winston.transports.File, { filename: '/log/locationLinks.log' });

 // logs results of scrapes
 function logScrapeResults(results) {
     var logLevel = results.errors === null ? 'info': 'warn';
     var message = 'Listing Links found';

     winston.log(logLevel, message || null, {
         results
     });
 }

function regexMatchLink(link){
    var regexListingLink = /rooms\/\d.*/g;
    return link.match(regexListingLink)
}

// use regex to filter out links that are not listings
function filterLinks(dataArray){
  return dataArray.filter(regexMatchLink);
}

 function convertToArray(dataString){
     return dataString.toString().split(",");
 }


 function scrapeChildPromise(location) {

     return new Promise((resolve, reject) => {

         var processData = "";
         var errors = "";
         var linkScrapeChild = child_process.spawn(casperjsPath, ['casperLinkScript.js ' + location]);

         linkScrapeChild.stdout.on('data', (data) => processData += data.toString());
         linkScrapeChild.stderr.on('data', (err) => errors += err.toString());
         linkScrapeChild.on("error", (err) => errors = err.toString());
         linkScrapeChild.on('close', (code) => {

             var uniqueLinks = [...new Set(filterLinks(convertToArray(processData)))];
             var quantityUniqueLinks = uniqueLinks.length;

             linkScrapeChild.kill();

             if (!uniqueLinks.length) errors += `No valid listings found for ${location}`;
                console.log('errors are' + errors);
             if (errors)
                 reject({ code, errors });
             else
                 resolve({ code, uniqueLinks, quantityUniqueLinks });
         });
     });
 }

 function scrapeLinks(location){
     scrapeChildPromise('dundee').then((result) => {
         // result.code
         // result.uniqueLinks
         console.log(result)

     }, (result) => {
      //   console.log('tt');
         console.log(result.errors);
      //  console.log(result.code);
         // result.code
         // result.errors
     }).then( function(result) {
         console.log('pokl');
         console.log("result")
     });
 }


exports.task = {
    scrapeLinks: scrapeLinks,
    scrapeChildPromise: scrapeChildPromise
};


