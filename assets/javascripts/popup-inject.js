chrome.storage.sync.get(["userColour", "userData"], function(response){
  if(typeof response.userData === "undefined") {
    alert(
      "You haven't set your HackOne profile. " +
      "Please go to your settings to configure it."
    );
  } else {
    // Dispatch through a Event Listener
    var listener = new CustomEvent("hackone:onUserDataReceived", {
      detail: {
        version:    chrome.runtime.getManifest().version,
        userColour: response.userColour,
        userData:   response.userData
      },
      bubbles:    false,
      cancelable: false
    });
    document.dispatchEvent(listener);

    // Autocomplete functionality
    function AutoComplete(userData) {
      this.userData = userData || {};
      this.autocompleteElements = [];

      this.getAutocompleteElements = function () {
        this.autocompleteElements = document.querySelectorAll('[data-hackone]') || [];
        return this.autocompleteElements;
      };

      this.extractValueFromDotNotation = function (arrayKey, localUserData) {
        localUserData = localUserData || this.userData;

        var firstKeyValue = arrayKey.shift();
        var localUserDataFromFirstKeyValue = localUserData[firstKeyValue];

        if (firstKeyValue && typeof localUserDataFromFirstKeyValue !== "string") {
          return this.extractValueFromDotNotation(arrayKey, localUserDataFromFirstKeyValue);
        } else {
          return localUserDataFromFirstKeyValue;
        }
      };

      this.perform = function () {
        this.getAutocompleteElements();

        if (this.autocompleteElements.length > 0) {
          this.autocompleteElements.forEach(function (element) {
            var dotNotation = element.dataset.hackone;
            try {
              var newValue = this.extractValueFromDotNotation(dotNotation.split('.'));

              if (newValue) {
                element.value = newValue;
              }
            } catch (e) {
              console.error("Error trying to autocomplete field with the notation [" + dotNotation + "]", element);
            }
          });
        }
      };
    };

    try {
      (new AutoComplete(response.userData)).perform();
    } catch (e) {
      console.error("Autocomplete element failed to initialise");
    }
  }
});