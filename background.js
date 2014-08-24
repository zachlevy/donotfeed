$(document).ready(function() {
  window.setInterval(function(){
    var links = setLinks(); // set to a var so that jquery re-grabs the dom
  }, 5000);
});


function setLinks () {
  // list of domains that dont require a DoNotFeed Link
  var whitelist = [
    "http://instagr.am/",
    "http://www.apple.com/ios/"
  ];
  $("[id^=feed_stream] a").each(function () {
    if ($(this).attr("target") == "_blank" && !$(this).parents(".userContentWrapper").attr("data-donotfeed")) {
      $(this).parents(".userContentWrapper").attr("data-donotfeed", true);
      var decoded = cleanURL($(this).attr("href"));
      if (decoded === false || $.inArray(decoded, whitelist) != -1) {
        return false;
      } else {
        // small link
        $(this).parents(".userContentWrapper").find("form > div > div").append("&middot; <a href=\"" + decoded + "\" class=\"donotfeed-text\" target=\"_blank\"><i class=\"fa fa-ban\"></i> Do Not Feed</a>");
        // big button
        //$(this).parent().append("<a href=\"" + decoded + "\" class=\"donotfeed-button\" target=\"_blank\" data-donotfeed=\"true\"><span class=\"donotfeed-top\">DoNotFeed</span><span class=\"donotfeed-bottom\">" + getTLD(decoded) + "</span></a>");
      }
    }
  });
}

function getTLD (url) {
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];  // domain will be null if no match is found
  return domain;
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
