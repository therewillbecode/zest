/**
 * Created by Tom on 06/03/2016.
 */
function filterLinks(dataArray){
    dataArray = dataArray.join("");
    var listingRegex = new RegExp("/rooms\\d.*", "g");  // match links that correspond to a listing
    return dataArray.match(/rooms\/\d.*/g)
}
filterLinks()