var zombie = require("zombie");
var browser = new zombie
browser.visit("htdtp://www.ec/", function(err, browser, status) {
    console.log("done")
});