'use strict';
(function () {

  var tokyoPin = document.querySelector('.tokyo__pin-map');

  function renderHome1(home) {
    var place = '<div class="pin" tabindex="0" style="left:' + (home.location.x - 28) + 'px; top:' + (home.location.y - 75) + 'px"><img src="' + home.author.avatar + '" class="rounded" width="40" height="40"></div>';

    return place;
  };

  //window.data.createHome();

  function addHomes (homes) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < homes.length; i++) {
    var element = document.createElement('div');
    element.innerHTML = renderHome1(homes[i]);
    fragment.appendChild(element);
  }
    tokyoPin.appendChild(fragment);
  }

  function successHandler(data) {
    window.data.homes = data;
    addHomes(window.data.homes);
    window.data.pinStreet = document.querySelectorAll('.pin');
  };

  window.backend.load(successHandler, window.data.errorHandler);

  })();
