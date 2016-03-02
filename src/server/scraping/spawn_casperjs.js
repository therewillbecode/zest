/**
 * Created by Tom on 02/03/2016.
 */
'use strict';

var exec = require('child_process').exec;

// executes Casperjs script as a child process
function casperChildProcess(scriptName, argument) {
    let command = 'casperjs ' + scriptName + ' ' + argument;
    let runCasperjs = exec(command);

    runCasperjs.stdout.on('data', function (data) {
        console.log(command + ' - stdout: ' + data);
    });

    runCasperjs.stderr.on('data', function (data) {
        console.log(command + 'stdout: ' + data);
    });

    runCasperjs.on('close', function (code) {
        console.log(command + ' - closing code: ' + code);
    });
}


casperChildProcess('getLocationLinks.js', 'dundee');