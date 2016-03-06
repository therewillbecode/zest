/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb listings in London is 'casperjs getLocationLinks.js London'
 */


// i should add LOGGING TO THIS USING CASPER.LOG

function getPageLinkElements() {
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

casper.start('http://www.airbnb.co.uk/');

var dump = [];
var fs = require('fs');
var collectedLinks = [];    // stores the list of scraped room links
var searchLocation = casper.cli.get(0); // location for which to retrieve listing
var searchFormSelector = '#location';
var searchFormSubmitBtnSelector = 'button#submit_location>span';
var nextPageSelector ='li.next.next_page';

// perhaps put search location in own function
casper.waitForSelector(searchFormSelector, function enterSearchLocation() { // // wait for homepage to load
    casper.sendKeys(searchFormSelector, searchLocation);   // once loaded enter location into input box
});

// click on submit button to display properties in given location
casper.thenClick(searchFormSubmitBtnSelector);

function collectLinksAndPaginate() {

    casper.waitForSelector(nextPageSelector);

    casper.thenClick(nextPageSelector);

    casper.waitForSelector(nextPageSelector);

    casper.then(function aggregateLinks() {
        dump.push (this.evaluate(getPageLinkElements));    // aggregate results for the 'phantomjs' search
    });
}

casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
});


casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
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

casper.run(function onCompletion() {
   // console.log(collectedLinks.length + ' links found:');    // echo results in some pretty fashion
    this.echo(dump);
    //this.echo(' - ' + collectedLinks.join('\n')).exit();
    casper.exit();
});


