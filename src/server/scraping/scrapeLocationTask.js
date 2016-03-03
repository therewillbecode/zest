/**                         Created by Tom on 03/03/2016.
 *  Spawns process that runs casper script that scrapes links airbnb for given location.
 */

var child_process = require('child_process');
var casperjsPath = "C:\\casperjs\\bin\\casperjs.exe";

function scrapeLocation(location) {
    var casperLocationScrape = child_process.spawn(casperjsPath, ['getLocationLinks.js ' + location]);
    var links = null;
    casperLocationScrape.stdout.on('data', function (data) {
        links = data.toString();
    });

    casperLocationScrape.on('close', function (code) {
        console.log('Child process - Location Scrape:  ' + location + ' - closed with code: ' + code);
        console.log(links);
        return links;
    });
}

scrapeLocation('dundee');