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

var linksDumpArr = [];  // stores the list of scraped room links
var searchLocation = casper.cli.get(0); // location for which to retrieve listing
var searchFormSelector = '#location';
var searchFormSubmitBtnSelector = 'button#submit_location>span';
var nextPageSelector ='#site-content > div > div.sidebar > div.search-results > div.results-footer > div.pagination-buttons-container.row-space-8 > div.pagination.pagination-responsive > ul > li.next.next_page > a > i';
var pageNo = 1;   // keeps track of listing page casper is on

// perhaps put search location in own function
casper.waitForSelector(searchFormSelector, function enterSearchLocation() {
    // once loaded enter location into input box
    casper.sendKeys(searchFormSelector, searchLocation);
});

// click on submit button to display properties in given location
casper.thenClick(searchFormSubmitBtnSelector);


function collectLinksAndPaginate() {

    casper.waitForSelector(nextPageSelector, function nextPageLoaded(){
        casper.log('next page loaded') ;
        this.wait(1000, function getLinks(){
            linksDumpArr.push (this.evaluate(getPageLinkElements));    // aggregate results for the 'phantomjs' search
            console.log('links retrieved ' + this.evaluate(getPageLinkElements))
        })
    });

    // wait for next page selector to appear
    casper.waitForSelector(nextPageSelector,
        function nextPageSelectorLoaded() {
            casper.log('next page loaded');
            if (casper.exists(nextPageSelector)) {
                casper.thenClick(nextPageSelector);
                casper.log('clicked next page')
            }
        },
        function nextPageSelectorTimeout(){
            casper.log('next page btn doesnt exist');
            casper.exit('page number: ' + (pageNo) + ' is the last page of results')
        },
        5000    // timeout for next page selector
    );



    pageNo++;
}

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
    this.echo(linksDumpArr);
    casper.exit();
});


