$(document).ready(function() {
  //cleanURL("http://www.example.com/index.php?id=1&image=awesome.jpg");
  //var cleaned = cleanURL("http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.gordonsfightback.com%2F&h=JAQE2EQ9H&s=1");
  //console.log(cleaned);
  console.log("start");
  window.setInterval(function(){
    setLinks();
  }, 5000);

});


function setLinks () {
  $("[id^=feed_stream] a").each(function () {
    var link;
    if ($(this).attr("target") == "_blank") {
      link = $(this);
      console.log("Encoded: " + link.attr("href"));
      link.css("background", "red");
      //var facebookURL = "http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.blogto.com%2Feat_drink%2F201…QzdL8EY6Wts7mRqUr3GDoDdIsSRP6KWMiuJnBvsmxRhcOXlAYuRcY-m63Y5X5PVlniV89E&s=1";
      //var facebookURL = "http://www.example.com/index.php?id=1&image=awesome.jpg";
      var decoded = cleanURL(link.attr("href"));
      console.log("Decoded: " + decoded);
    }
  });
}

function cleanURL (dirty) {
  var clean = decodeURIComponent(getQueryVariable("u", dirty));
  return clean;
}

function getQueryVariable(variable, url) {
  var query = url.split("?");
  console.log("Query: " +  query[1]);
  var vars = query[1].split("&");
  console.log("Vars: " + vars);
  for (var i=0;i<vars.length;i++) {

    var pair = vars[i].split("=");

    if(pair[0] == variable) {
      console.log("Success: " + pair[1]);
      return pair[1];
    }

  }
  return(false);
}
/*
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
*/
/*
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
*/
