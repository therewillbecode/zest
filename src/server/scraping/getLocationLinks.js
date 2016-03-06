/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb listings in London is 'casperjs getLocationLinks.js London'
 */

// i should add LOGGING TO THIS USING CASPER.LOG

function getPageLinkElements() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
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
var nextPageSelector ='#site-content > div > div.sidebar > div.search-results > div.results-footer > div.pagination-buttons-container.row-space-8 > div.pagination.pagination-responsive > ul > li.next.next_page > a > i';


// perhaps put search location in own function
casper.waitForSelector(searchFormSelector, function enterSearchLocation() { // // wait for homepage to load
    casper.sendKeys(searchFormSelector, searchLocation);   // once loaded enter location into input box
});

// click on submit button to display properties in given location
casper.thenClick(searchFormSubmitBtnSelector);
var pageno = 0;
function collectLinksAndPaginate() {
    pageno++;
    casper.wait(2000, function agglinks() {
        casper.waitForSelector(nextPageSelector);
    });
    if (casper.exists((nextPageSelector))) {
        // <b>Bar</b> exists
        casper.capture('page' + pageno + '.png')
        casper.thenClick(nextPageSelector);
        casper.log('clicked next page')

    }else
    {
        casper.log('next page btn doesnt exist')
        casper.exit(' page btn doesnt exist')
    }

    casper.waitForSelector(nextPageSelector);
    casper.log('next page loaded')


    casper.wait(2000, function agglinks() {
        dump.push (this.evaluate(getPageLinkElements));    // aggregate results for the 'phantomjs' search
        console.log(' links retrieved ' + this.evaluate(getPageLinkElements))
    });
    casper.then(function aggregateLinks() {

    });
}

casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
});


casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
});


casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
});


casper.then(function collectAndPaginate(){
    collectLinksAndPaginate();
});




casper.then(function (){

    this.wait(2000, function takeScreenshot() {
        this.captureSelector('casperScreenShot.png',nextPageSelector)
        });

});

casper.run(function onCompletion() {
   // console.log(collectedLinks.length + ' links found:');    // echo results in some pretty fashion
    this.echo(dump);
    //this.echo(' - ' + collectedLinks.join('\n')).exit();
    casper.exit();
});


