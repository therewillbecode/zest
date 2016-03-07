/**
 * Created by Tom on 07/03/2016.
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

// location for which to retrieve body of page
var url = casper.cli.get(0);
// selector for which to pull HTML from
var selectorForContent = '#site-content';
// variable to store scraped content
var pageContent = null;

/*
    Casper Steps
 */
casper.start(url);

// once loaded enter get content
casper.waitForSelector(selectorForContent, function enterSearchLocation() {
    pageContent = casper.getHTML(selectorForContent, false);
});


/*
    run steps then on completion of casper process push content to stdout
 */
casper.run(function onCompletion() {
    this.echo(pageContent);
    casper.exit();
});