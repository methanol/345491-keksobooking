'use strict';
(function () {

  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  function renderHome1(home) {
    var place = '<div class="pin" tabindex="0" style="left:' + (home.location.x - 28) + 'px; top:' + (home.location.y - 75) + 'px"><img src="' + home.author.avatar + '" class="rounded" width="40" height="40"></div>';

    return place;
  };

  window.data.createHome();

  for (var i = 0; i < window.data.homes.length; i++) {
    var element = document.createElement('div');
    element.innerHTML = renderHome1(window.data.homes[i]);
    fragment.appendChild(element);
  }

  tokyoPin.appendChild(fragment);

  })();
