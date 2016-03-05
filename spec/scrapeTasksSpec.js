//scrapeTasks = require('/src/server/scraping/scrapeTasks.js');

describe("scrape location", function() {

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


 })

});

