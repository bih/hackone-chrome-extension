window.HackOne = {
  userColour: "#DE1673",                  /* The user's preference for colour. */
  userDefaults: { firstName: "Unknown" }, /* The default output for a user's profile. */
  isProfileCompleted: false,              /* Is the user's profile completed? */
  durationPending: 4000,                  /* The duration (ms) for how long the pending screen should show for. */
  methods: {}                             /* Internal methods */
};

chrome.storage.sync.get(["userColour", "userData"], function(response) {
  HackOne.isProfileCompleted = (typeof response.userData !== "undefined" && response.userData !== null);

  /* Update Colour on UI */
  (function (userColour) {
    HackOne.userColour = userColour;
    document.body.style.backgroundColor = userColour;
  })(response.userColour || window.HackOne.userColour);

  /* Update First Name on UI */
  (function (isProfileCompleted, firstName) {
    if (isProfileCompleted && firstName) {
      HackOne.userDefaults.firstName = firstName;
      document.getElementById('firstName').innerHTML = firstName;
    }
  })(HackOne.isProfileCompleted, response.userData.bio.firstName);
});

document.addEventListener("DOMContentLoaded", function(){
  var states = {};
  states.set = function(name) {
    var _states = ["pending", "error incomplete", "success"];
    for(var i = 0; i < _states.length; i++) {
      document.getElementsByClassName('state ' + _states[i])[0].style.display = "none";
    }
    document.getElementsByClassName('state ' + name)[0].style.display = "block";
  };

  states.pending = function(callback) {
    states.set("pending");

    document.getElementById("information").innerHTML = "Sharing your profile, <span id='firstName'>" + HackOne.userDefaults.firstName + "</span>...";
    document.body.style.backgroundColor = HackOne.userColour;

    var getRandomColor = function() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    var startColor = getRandomColor();
    var endColor = getRandomColor();
    var _duration = HackOne.durationPending || 4000;

    var element = document.getElementById('pending-circle');
    var circle = new ProgressBar.Circle(element, {
        color: startColor,
        trailColor: '#eee',
        trailWidth: 1,
        duration: _duration,
        easing: 'easeOut',
        strokeWidth: 5,
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    });

    circle.animate(1, {
        from: {color: startColor},
        to: {color: endColor}
    });

    setTimeout(function(){
      callback();
      circle.destroy();
    }, _duration);
  };

  states.errorIncomplete = function() {
    states.set("error incomplete");
    document.body.style.backgroundColor = "#e74949";
  };

  states.success = function() {
    states.set("success");
    document.body.style.backgroundColor = "#49E778";

    var opacity = 0;
    document.getElementsByClassName('state success')[0].style.opacity = opacity;

    var incrementOpacity = setInterval(function(){
      opacity += 0.1;
      document.getElementsByClassName('state success')[0].style.opacity = opacity;

      if(opacity >= 100) {
        clearInterval(incrementOpacity);
      }
    }, 50);
  };

  states.pending(function(){
    continueWhenPendingCompleted();
  });

  var continueWhenPendingCompleted = function(){
    if(HackOne.isProfileCompleted === false) {
      states.errorIncomplete();
    } else {
      HackOne.methods.continueWithSendingData();
    }
  };

  HackOne.methods.continueWithSendingData = function(){
    chrome.tabs.executeScript({
      file: "/assets/javascripts/popup-inject.js"
    });
    states.success();
  };
});