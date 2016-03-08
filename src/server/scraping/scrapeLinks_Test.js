/**
 * Created by Tom on 08/03/2016.
 */
/**
 * Created by Tom on 08/03/2016.
 */
var mocha = require('mocha')
var child_process = require('child_process');
var events = require('events');

var nock = require('nock');
var expect = require('chai').expect;
var scrapeListing = require('./scrapeListing').task;


describe('#scrapeLinks', function(){

    describe('on no response from airbnb homepage', function(){

        describe("html get", function(){


            beforeEach(function() {
                  nock('http://www.airbnb.co.uk')
                     .get("/")
                     .reply(200, "hello there");
            });


            it('gets http of', function(done){


               scrapeListing.getHtmlBody('http://www.airbnb.co.uk', function(error, html) {
                   expect(html).to.not.be.null;
                   console.log(html)
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
});

