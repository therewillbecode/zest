/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb properties in London is 'casperjs getLocationLinks.js London'
 */

var fs = require('fs');

function writeToJson(data, location, time) {
    var path = './scrapedLinksData/output.txt';
    fs.write(path, data, 'w');
}

function getLinks() {
    var collectedLinks = document.querySelectorAll('a');
    return Array.prototype.map.call(collectedLinks, function(e) {
        return e.getAttribute('href');
    });
}

var casper = require('casper').create({
    pageSettings: {
        loadImages:  true,        // The WebPage instance used by Casper will
        loadPlugins: true         // use these settings
    },
    viewportSize : {
        width: 768,
        height: 1024
    }
});

var collectedLinks = [];
var searchLocation = casper.cli.get(0);

casper.start('http://www.airbnb.co.uk/');

casper.waitForSelector(".panel-dark", function() {
    casper.sendKeys('#location', searchLocation);
});

casper.then(function() {
    collectedLinks = this.evaluate(getLinks);    // aggregate results for the 'casperjs' search
    this.wait(150, function () {
        this.capture('casperScreenShot.png', {
            top: 100,
            left: 0,
            width: 700,
            height: 1500
        });
    });
});

casper.then(function() {
    collectedLinks = collectedLinks.concat(this.evaluate(getLinks));    // aggregate results for the 'phantomjs' search
});

casper.run(function() {
    console.log(collectedLinks.length + ' links found:');    // echo results in some pretty fashion
    this.echo(' - ' + collectedLinks.join('\n - ')).exit();
    casper.exit();
});



