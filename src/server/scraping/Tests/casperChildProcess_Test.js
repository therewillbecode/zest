/**
 * Created by Tom on 08/03/2016.
 */

var mocha = require('mocha');
var events = require('events');

var nock = require('nock');
var expect = require('chai').expect;
var scrapeListing = require('./../scrapeLinks').task;

var mockSpawn = require('mock-spawn');
var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

// override child_process.spawn
// this is a simplistic example; you can use a library like `mockery` to
// set a new instance for every test. See examples/complete/test.js

mySpawn.setDefault(mySpawn.simple(1 /* exit code */, 'hello world' /* stdout */));

describe('#scrapeLinkschild', function(){

    describe("error handling", function(){
        before(function() {
            mySpawn.sequence.add(function (cb) {
                // test the error handling when error is emitted by spawned child
                this.emit('error', new Error('spawn ENOENT'));
                setTimeout(function() { return cb(8); }, 10);
            });
        });

        it('error is passed to node when spawned child emits error', function(done){

            scrapeListing.scrapeLinks('dundee', function(error, data) {
                expect(error).to.not.be.null;
                done();
            });

        });


        before(function() {
            mySpawn.sequence.add({throws:new Error('spawn ENOENT')});
        });

        it('error passed to node when raised by spawned child', function(done){
            // test the error handling when error in raised by spawned child
            expect(scrapeListing.scrapeLinks).to.throw(Error);
            done();
        });


        before(function() {
            mySpawn.sequence.add({throws:new Error('spawn ENOENT')});
        });

        it('errors should be logged', function(done){
            // test the error handling when error in raised by spawned child
            expect(scrapeListing.scrapeLinks).to.throw(Error);
            done();
        });




    });

});


