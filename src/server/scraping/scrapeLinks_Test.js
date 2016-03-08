/**
 * Created by Tom on 08/03/2016.
 */
/**
 * Created by Tom on 08/03/2016.
 */
var mocha = require('mocha');
var events = require('events');

var nock = require('nock');
var expect = require('chai').expect;
var scrapeListing = require('./scrapingTaskRunner').task;

var mockSpawn = require('mock-spawn');

// override child_process.spawn
// this is a simplistic example; you can use a library like `mockery` to
// set a new instance for every test. See examples/complete/test.js

require('child_process').spawn = mySpawn;

var mockSpawn = require('mock-spawn');

describe('#scrapeLinks', function(){

    describe('on no response from airbnb homepage', function(){

        describe("html get", function(){


            beforeEach(function() {

                var mySpawn = mockSpawn();
                require('child_process').spawn = mySpawn;

                mySpawn.setDefault(mySpawn.simple(1 /* exit code */, 'hello world' /* stdout */));

            });


            it('spawned process', function(done){
                scrapeListing.scrapeLinks(, function(error, data) {
                    expect(data).to.not.be.null;
                    console.log(data);
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

