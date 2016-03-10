/**
 * Created by Tom on 08/03/2016.
 */

var mockSpawn = require('mock-spawn');

// override child_process.spawn
// this is a simplistic example; you can use a library like `mockery` to
// set a new instance for every test. See examples/complete/test.js

require('child_process').spawn = mySpawn;

var mockSpawn = require('mock-spawn');
var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

mySpawn.sequence.add({throws:new Error('spawn ENOENT')});

var firstCall = mySpawn.calls[0];

mySpawn.setDefault(mySpawn.simple(1 /* exit code */, 'hello world' /* stdout */));
describe('#spawned process', function(){

    describe('when encounters error', function(){

            beforeEach(function() {


// basic stuff
                var mySpawn = mockSpawn();
                require('child_process').spawn = mySpawn;

// we are now testing if our library under test retries spawn commands on error
// when executing the `foo` command

                var count = 0;
                mySpawn.setStrategy(function (command, args, opts) {
                    if (command !== 'foo') { return null; } // use default
                    if (++count < 3) {
                        return mySpawn.simple(1); //exit 1 immediately
                    }
                    return function (cb) {
                        this.stdout.write('output data my library expects');
                        return cb(0); // and exit 0
                    };
                });

            });


            it('should emit error event', function(done){
                scrapeListing.scrapeLinks(, function(error, data) {
                    expect(mockSpawn).to.not.be.null;
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

