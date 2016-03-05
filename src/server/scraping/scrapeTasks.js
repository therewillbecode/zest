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

function scrapeLinks(location) {
    var links = null;
    var casperLocationScrape = child_process.spawn(casperjsPath, ['getLocationLinks.js ' + location]);

    casperLocationScrape.stdout.on('data', function (data) {
        links = data.toString();
        console.log('stdout')
    });
    console.log(1)

    casperLocationScrape.on('close', function (code) {
        console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);
    console.log(2);
        return 'return'
    //    console.log(links);
     //   return links;
     //   return filterLinks(links, listingLinkRegex);
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

