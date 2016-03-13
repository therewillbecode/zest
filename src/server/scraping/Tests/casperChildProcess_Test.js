/**
 * Created by Tom on 08/03/2016.
 */

var events = require('events');

var mocha = require('mocha');
var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var nock = require('nock');

//var mockSpawn = require('mock-spawn');
//var mySpawn = mockSpawn();
//require('child_process').spawn = mySpawn;

var scrapeListing = require('./../scrapeLinks').task;


// dependency injection - override child_process.spawn
//mySpawn.setDefault(mySpawn.simple(0 /* exit code */, 'hello world' /* stdout */));

describe('#scrapeLinkschild', function(){

    describe("error handling", function(){

        before(function() {
         //   mySpawn.sequence.add(function (cb) {
                // test the error handling when error is emitted by spawned child

                // setTimeout(function() { return cb(8); }, 10);
           // });
        });

        it('promise is fulfilled when no errors are present', function(){

            var promised =  scrapeListing.scrapeChildPromise('dundee');

            return assert.isFulfilled(promised, "optional message");

        });

        it('promise is rejected when errors are present', function(){

            var promised =  scrapeListing.scrapeChildPromise('8585');

            return assert.isRejected(promised, "optional message");

        });


        before(function() {
      //      mySpawn.sequence.add(function (cb) {
                // test the error handling when error is emitted by spawned child
    //            this.emit('error', new Error('spawn ENOENT'));
                // setTimeout(function() { return cb(8); }, 10);
    //        });
        });

        it('error is passed to node when spawned child emits error', function(){

            scrapeListing.scrapeLinks('dundee', function(error, data) {
                console.log(error)
                return expect(error).to.eventually.not.be.null;

            });

        });

        before(function() {
    //        mySpawn.sequence.add(function (cb) {
                // test the error handling when error is emitted by spawned child

                // setTimeout(function() { return cb(8); }, 10);
  //          });
        });

        it('error is not passed to node when spawned child does not emit error', function(){

            scrapeListing.scrapeLinks('dundee', function(error, data) {
                return expect(error).to.eventually.be.null;

            });

        });



        before(function() {
            //mySpawn.sequence.add({throws:new Error('spawn ENOENT')});
        });

        it('promise should be rejected if child exit code is not 0', function(){
            // test the error handling when error in raised by spawned child
            scrapeListing.scrapeLinks('dundee', function(error, data) {
                return expect(scrapeListing.scrapeLinks).to.be.rejected;

            });
        });




    });

});


