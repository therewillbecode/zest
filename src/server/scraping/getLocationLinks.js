/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb listings in London is 'casperjs getLocationLinks.js London'
 */


// i should add LOGGING TO THIS USING CASPER.LOG

function getLinks() {
    var collectedLinks = document.querySelectorAll('a');
    return Array.prototype.map.call(collectedLinks, function(e) {
        return e.getAttribute('href');
    });
}

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    pageSettings: {
        loadImages:  true,        // The WebPage instance used by Casper will
        loadPlugins: true         // use these settings
    },
    viewportSize: {
        width: 768,
        height: 1024
    }
});

var fs = require('fs');
var collectedLinks = [];    // stores the list of scraped room links
var searchLocation = casper.cli.get(0); // location for which to retrieve listing

casper.start('http://www.airbnb.co.uk/');

// perhaps put search location in own function
casper.waitForSelector(".panel-dark", function enterSearchLocation() { // // wait for homepage to load
    casper.sendKeys('#location', searchLocation);   // once loaded enter location into input box
});

// click on submit button to display properties in given location
casper.thenClick('button#submit_location>span');

//casper.waitForSelector("i.icon-caret-right", function() {
//    casper.sendKeys('#location', searchLocation);
//});

//click next page
//casper.thenClick("i.icon-caret-right.ct-active");
casper.thenClick("li.next.next_page");

casper.then(function callGetLinks() {
    collectedLinks = this.evaluate(getLinks);
});

casper.then(function (){
    this.wait(300, function takeScreenshot() {
        this.capture('casperScreenShot.png', {
            top: 100,
            left: 0,
            width: 700,
            height: 1500
        });
    });
});


casper.then(function aggregateLinks() {
    collectedLinks = collectedLinks.concat(this.evaluate(getLinks));    // aggregate results for the 'phantomjs' search
});

casper.run(function onCompletion() {
    console.log(collectedLinks.length + ' links found:');    // echo results in some pretty fashion
    this.echo(' - ' + collectedLinks.join('\n - ')).exit();
    casper.exit();
});


