/**                         Created by Tom on 03/03/2016.
 *  Defines queue for webscraping tasks
 *
 */
//var request = require("request");
var async = require("async");
var scrapeTask = require('./scrapeTasks.js'); // imports individual scraping tasks to spawn

scrapeTask.task.scrapeLinks('dundee');

