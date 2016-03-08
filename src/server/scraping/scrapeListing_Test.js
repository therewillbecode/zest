/**
 * Created by Tom on 08/03/2016.
 */
/**
 * Created by Tom on 08/03/2016.
 */
/**
 * Created by Tom on 08/03/2016.
 */

var mocha = require('mocha');
var child_process = require('child_process');
var events = require('events');

var nock = require('nock');
var expect = require('chai').expect;
var scrapeListing = require('./scrapeListing').task;


describe('#scrapeLinks', function(){

    describe('when status code from http response', function(){


            before(function() {
                nock('http://www.airbnb.co.uk')
                    .get("/")
                    .reply(404);
            });


            it('is not 200 an error should be given', function(done){
                scrapeListing.getHtmlBody('http://www.airbnb.co.uk/', function(error, response, html) {
                    expect(error).not.to.be.null;
                    done();
                });
            });

    });


    it('should be asynchronous', function(done) {
        setTimeout(function() {
            done();
        }, 500);
    });

});

