$(document).ready(function() {
  console.log("start");

  window.setInterval(function(){
    setLinks();
  }, 5000);

});


function setLinks () {
  var whitelist = [
    "http://instagr.am/"
  ];
  $("[id^=feed_stream] a").each(function () {
    if ($(this).attr("target") == "_blank" && !$(this).attr("data-donotfeed")) {
      
      $(this).attr("data-donotfeed", true);
      //console.log("Encoded: " + link.attr("href"));
      $(this).parent().css("background", "red");
      var decoded = cleanURL($(this).attr("href"));
      if (decoded === false || $.inArray(decoded, whitelist) != -1) {
        return false;
      } else {
        $(this).parent().append("<a href=\"" + decoded + "\" class=\"donotfeed-button\">Link</a>");
        //$("#blueBarNAXAnchor").append("<a href=\"" + decoded + "\">Link</a>");
      }
    }
  });
}

function cleanURL (dirty) {
  //console.log("dirty: " + dirty);
  var outgoing = getQueryVariable("u", dirty);
  if (outgoing === false) {
    return false;
  }
  //console.log("outgoing: " + outgoing);
  var clean = decodeURIComponent(outgoing);
  console.log("clean: " + clean);
  return clean;
}

function getQueryVariable(variable, url) {
  var query = url.split("?");
  //console.log("Query: " +  query[1]);
  var vars = query[1].split("&");
  //console.log("Vars: " + vars);
  for (var i=0;i<vars.length;i++) {

    var pair = vars[i].split("=");

    if(pair[0] == variable) {
      //console.log("Success: " + pair[1]);
      return pair[1];
    }

  }
  return(false);
}
