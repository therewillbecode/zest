function getLinks() {
    var collectedLinks = document.querySelectorAll('h3.r a');
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

//var location_field = $('input#location');
casper.start('http://www.airbnb.co.uk/', function() {
});

casper.waitForSelector(".panel-dark", function() {
    casper.sendKeys('#location', searchLocation);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    collectedLinks = this.evaluate(getLinks);
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
    this.echo(collectedLinks.length + ' links found:');    // echo results in some pretty fashion
    this.echo(' - ' + collectedLinks.join('\n - ')).exit();
});