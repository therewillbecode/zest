 //                                  Task for a given location
 //  1. Spawns process that runs casper script that scrapes all links for given location for all pages.
 //  2. Parses listing links and removes extraneous links
 //
 //

var child_process = require('child_process');
var casperjsPath = process.platform === "win32" ? "C:\\casperjs\\bin\\casperjs.exe" : "casperjs";
var listingLinkRegex = /room/;  //regular expression to match links that correspond to a listing

function scrapeLinks(location) {
    var links = null;
    var casperLocationScrape = child_process.spawn(casperjsPath, ['getLocationLinks.js ' + location]);

    casperLocationScrape.stdout.on('data', function (data) {
        links = data.toString();
    });

    casperLocationScrape.on('close', function (code) {
        console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);
        console.log(links);
        return links;
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
    filterLinks: filterLinks()
};

