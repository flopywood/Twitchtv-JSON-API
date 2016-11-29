var channels = ["freecodecamp", "storbeck", "MedryBW", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "thomasballinger", "noobs2ninjas", "esl_csgo", "beohoff"];

function offline(num) {
  var url = num;

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    headers: {
   'Client-ID': 'pppzr9bh132rqpdlmy2xw5y5revcpbp'
    },
    success: function(twitch) {

      var userIcon = twitch.logo;
      var username = twitch.name;
      var userlink = twitch.display_name;
      var offline = "OFFLINE";

      if (userIcon === undefined) {
        userIcon = "http://bit.ly/1WGY3Uw";
      }

      if (username === undefined) {
        username(twitch._links.channel);
      }

      console.log(channels[num] + twitch.status);

      if (twitch.status === 422) {
        offline = "ACCOUNT CLOSED";
      }

      document.getElementById("follower_info").innerHTML += "<div class='row'><a href=" + userlink + "><div class='col-md-4'><img src='" + userIcon +"' height='75'></div><div class='col-md-4'><p>" + username + "</p></div><div class='col-md-4'><p>" + offline + "</p></a></div></div>";
  }
  });
}

$(document).ready(function() {

  for (var i = 0; i < channels.length; i++) {

    var url = "https://api.twitch.tv/kraken/streams/" + channels[i];

    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      headers: {
      'Client-ID': 'pppzr9bh132rqpdlmy2xw5y5revcpbp'
      },
      success: function(twitch) {
        if (twitch.stream === null) {
          offline(twitch._links.channel);
        }
        else {
          var userIcon = twitch.stream.channel.logo;
          var username = twitch.stream.channel.name;
          var userlink = twitch.stream.channel.url;
          var status = twitch.stream.channel.status;

          if (userIcon === undefined) {
            userIcon = "http://bit.ly/1WGY3Uw";
          }

          document.getElementById("follower_info").innerHTML += "<div class='row'><a href=" + userlink + "><div class='col-md-4'><img src='" + userIcon + "' height='75'></div><div class='col-md-4'><p" + username + "</p></div><div class='col-md-4' id='status'><p>" + status + "</p></div></a></div>";
        }
      },
      error: function(twitch) {
        console.log(channels[i]);
        offline(i);
      }
    });
  }
});
