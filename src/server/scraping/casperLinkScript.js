/**                         Created by Tom on 03/03/2016.
 *  Casperjs script scrapes links airbnb for location when called in command line
 *  For example the command to get links for airbnb listings in London is 'casperjs getLocationLinks.js London'
 */

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    viewportSize: {
        width: 768,
        height: 1024
    }
});


// location for which to retrieve listing
var searchLocation = casper.cli.get(0);
// stores the list of scraped room links
var linksDumpArr = [];
// selector for input box on home page form to type in location
var searchFormSelector = '#location';
// selector for homepage search button
var searchFormSubmitBtnSelector = 'button#submit_location>span';
// selector for a image on page which is used to know when full page content has loaded as img is slowest to load
var pageImageSelector = '#site-content > div > div.sidebar > div.search-results > div.outer-listings-container.row-space-2 > div > div > div:nth-child(6) > div > div.panel-image.listing-img > a.media-photo.media-cover > div > img';
// selector for pagination button
var nextPageBtnSelector ='#site-content > div > div.sidebar > div.search-results > div.results-footer > div.pagination-buttons-container.row-space-8 > div.pagination.pagination-responsive > ul > li.next.next_page > a > i';
// keeps track of results page casper is on
var pageNo = 1;


function getPageLinkElements() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}


// callback for next page selector fails to appear in DOM after given time
function nextPageSelectorTimeout() {
    casper.log('next page btn doesnt exist');
    casper.log('page number: ' + (pageNo) + ' is the last page of results')
    casper.log('casper exiting!');
    casper.exit()
}


// call this callback to click on next page selector if selector appears in DOM
function onLoadClickPageSelector() {
    casper.log('next page btn loaded in DOM');
    if (casper.exists(nextPageBtnSelector)) {
        casper.thenClick(nextPageBtnSelector);
        casper.log('clicked next page');
        scrapeLinksAndPaginate();
    }
}


// wait for next page selector to appear then click
function recursiveWaitClickPaginator(){
    casper.waitForSelector(
        nextPageBtnSelector,
        onLoadClickPageSelector,    // call this callback if next page selector appears in DOM
        nextPageSelectorTimeout,    // call this callback if next page selector fails to appear in DOM after given time
        5000    // timeout for next page selector
    );
}

// waits for page to load and then scrapes all links and pushes them to array
function onLoadScrapeLinks(){
    casper.waitForSelector(pageImageSelector, function nextPageLoaded(){
        // put delay here for more accurate scraping 90 -> 100%  links scraped
        casper.log('next page loaded in DOM') ;
        linksDumpArr.push (this.evaluate(getPageLinkElements));    // aggregate results for the 'phantomjs' search
        console.log('links retrieved ' + this.evaluate(getPageLinkElements));

    });
}


function scrapeLinksAndPaginate() {
    onLoadScrapeLinks();
    recursiveWaitClickPaginator(); // recursive call to ScrapeLinksAndPaginate if there is another page to scrape
    pageNo++;
}


/*
    Define steps for casperjs process
*/
casper.start('http://www.airbnb.co.uk/');

casper.waitForSelector(searchFormSelector, function enterSearchLocation() {
    casper.sendKeys(searchFormSelector, searchLocation);        // once loaded enter location into input box
});

casper.thenClick(searchFormSubmitBtnSelector);    // click on submit button to display properties in given location

casper.then(function collectAndPaginate(){
    scrapeLinksAndPaginate();
});

/*
    run steps above
*/
casper.run(function onCompletion() {
    this.echo(linksDumpArr);
    casper.exit();
});


