//scrapeTasks = require('/src/server/scraping/scrapeTasks.js');

describe("scrape location", function() {
  // var player;
  // var song;
  //spyOn(proc, 'exec')
//run your code
 // proc.exec.mostRecentCall.args[1](true)

  describe("filter out non-listing links", function() {
      beforeEach(function() {
          // define mock object to test
      });

      it("should match only valid listing urls", function() {
          //reg ex should match listing links
          expect(filterLinks('/rooms/users /rooms/454323 /rooms/gog').length).toEqual(1);
          //regex should not match other links
          expect(filterLinks('google.com /instagram /users foo www.google.co.uk')).toBeNull();
      });

      it("t", function() {

      });


      //it("can reference both scopes as needed", function () {
      //     expect(3).toEqual(bar);
      // });

 })

});


/*

describe("filter out links that are not listings", function() {
    beforeEach(function() {
      // player = new Player();
     // song = new Song();
     });


    it("regex should only match valid listing links", function() {
        //reg ex should match listing links
        expect(scrapeTasks.scrapeLinks()1).toEqual(1);
        //regex should not match other links
        expect(1).toEqual(1);
    });

    it("t", function() {

    });


     //it("can reference both scopes as needed", function () {
       //     expect(3).toEqual(bar);
    // });

  })





});

// just return input and test to see when

    */