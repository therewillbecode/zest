var links = [];
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


function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

//var location_field = $('input#location');

casper.start('http://www.airbnb.co.uk/', function() {

});

casper.waitForSelector(".panel-dark", function() {
    //var locationField = this.evaluate(function () {
   //     return $('input#location').find('select');
   // });
  //  this.fill('#location',  'dundee' , true);
  //  this.echo(locationField);
casper.sendKeys('#location', 'dundee');
//    this.click('#sm-search-field');
//#location
    //this.fillSelectors('#searchbar-form', { '#location': 'dundee' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
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
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));

});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});