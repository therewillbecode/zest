/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb listings in London is 'casperjs getLocationLinks.js London'
 */

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

var linksDumpArr = [];  // stores the list of scraped room links
var searchLocation = casper.cli.get(0); // location for which to retrieve listing
var searchFormSelector = '#location';
var searchFormSubmitBtnSelector = 'button#submit_location>span';
var nextPageSelector ='#site-content > div > div.sidebar > div.search-results > div.results-footer > div.pagination-buttons-container.row-space-8 > div.pagination.pagination-responsive > ul > li.next.next_page > a > i';
var pageNo = 1;   // keeps track of results page casper is on


function getPageLinkElements() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

// callback for next page selector fails to appear in DOM after given time
function nextPageSelectorTimeout() {
    casper.log('next page btn doesnt exist');
    casper.exit('page number: ' + (pageNo) + ' is the last page of results')
}


// call this callback to click on next page selector if selector appears in DOM
function onLoadClickPageSelector() {
    casper.log('next page btn loaded in DOM');
    if (casper.exists(nextPageSelector)) {
        casper.thenClick(nextPageSelector);
        casper.log('clicked next page')
    }
}

// wait for next page selector to appear then click
function waitClickPaginator(){
    casper.waitForSelector(
        nextPageSelector,   // call this callback if next page selector appears in DOM
        onLoadClickPageSelector,    // call this callback if next page selector fails to appear in DOM after given time
        5000    // timeout for next page selector
    );
}

// waits for page to load and then scrapes all links and pushes them to array
function onLoadScrapeLinks(){
    casper.waitForSelector(nextPageSelector, function nextPageLoaded(){
        this.wait(1000, function getLinks(){
            casper.log('next page loaded in DOM') ;
            linksDumpArr.push (this.evaluate(getPageLinkElements));    // aggregate results for the 'phantomjs' search
            console.log('links retrieved ' + this.evaluate(getPageLinkElements))
        })
    });
}

function scrapeLinksAndPaginate() {
    onLoadScrapeLinks();
    waitClickPaginator();
    pageNo++;
}


casper.start('http://www.airbnb.co.uk/');


// perhaps put search location in own function
casper.waitForSelector(searchFormSelector, function enterSearchLocation() {
    // once loaded enter location into input box
    casper.sendKeys(searchFormSelector, searchLocation);
});


// click on submit button to display properties in given location
casper.thenClick(searchFormSubmitBtnSelector);

casper.then(function collectAndPaginate(){
    scrapeLinksAndPaginate();
});

casper.then(function collectAndPaginate(){
    scrapeLinksAndPaginate();
});


casper.then(function (){

    this.wait(2000, function takeScreenshot() {
        this.captureSelector('casperScreenShot.png',nextPageSelector)
        });
});

casper.run(function onCompletion() {
    this.echo(linksDumpArr);
    casper.exit();
});


