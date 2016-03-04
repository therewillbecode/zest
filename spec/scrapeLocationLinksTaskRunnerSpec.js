var taskrunner = require('/src/server/scraping/scrapeLocationTaskrunner.js')

describe("taskrunner", function() {

    beforeEach(function() {
        // player = new Player();
        // song = new Song();
    });

    it("addone equal two", function() {
        //demonstrates use of custom matcher
        expect(taskrunner.add(1)).toEqual(2);
    });

});

// just return input and test to see whend that input is returned