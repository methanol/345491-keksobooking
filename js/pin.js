'use strict';
(function () {

  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var filterForm = document.querySelector('.tokyo__filters');
  var checkWifi = document.querySelector('.feature__image--wifi');
  var houseType = document.getElementById('housing_type');
  var housePrice = document.getElementById('housing_price');
  var houseRooms = document.getElementById('housing_room-number');
  var houseGuest = document.getElementById('housing_guests-number');
  var houseFeat = document.getElementById('housing_features');
  var inputFeat = houseFeat.querySelectorAll('input[type="checkbox"]');
  var lastTimeout;

  function renderHome1(home) {
    var place = '<div class="pin" tabindex="0" style="left:' + (home.location.x - 28) + 'px; top:' + (home.location.y - 75) + 'px"><img src="' + home.author.avatar + '" class="rounded" width="40" height="40"></div>';

    return place;
  };

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
    window.data.cloneHomes = window.data.homes.slice();
    window.data.pinStreet = document.querySelectorAll('.pin');
  }

  window.backend.load(successHandler, window.data.errorHandler);

  function debounce(times) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      addHomes(window.data.cloneHomes);
      window.data.pinStreet = document.querySelectorAll('.pin');
      console.log(window.data.cloneHomes);
      console.log(window.data.pinStreet);
    }, times);
  }

  //здесь будет универсальная функция для первых четырех условий:

  /*function homeSwitch(val1, case1, case2, case3, cond1, cond2, cond3) {
    switch (val1) {
      case case1:
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.cond1;
      });
      break;
      case case2:
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.cond2;
      });
      break;
      case case3:
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.cond3;
      });
      break;
      case 'any':
      break;
    }
  }*/

  filterForm.addEventListener('change', function(evt) {

    while (tokyoPin.children[1]) {
      tokyoPin.removeChild(tokyoPin.children[1]);
    }

    window.data.cloneHomes = window.data.homes.slice();

    switch (houseType.value) {
      case 'flat':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.type === 'flat';
      });
      break;
      case 'house':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.type === 'house';
      });
      break;
      case 'bungalo':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.type === 'bungalo';
      });
      break;
      case 'any':
      break;
    }

    switch (housePrice.value) {
      case 'low':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.price < 10000;
      });
      break;
      case 'middle':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return ((home.offer.price >= 10000) && (home.offer.price < 50000));
      });
      break;
      case 'high':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.price >= 50000;
      });
      break;
      case 'any':
      break;
    }

    switch (houseRooms.value) {
      case '1':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.rooms === 1;
      });
      break;
      case '2':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.rooms === 2;
      });
      break;
      case '3':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.rooms === 3;
      });
      break;
      case 'any':
      break;
    }

    switch (houseGuest.value) {
      case '1':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.guests === 1;
      });
      break;
      case '2':
      window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
        return home.offer.guests === 2;
      });
      break;
      case 'any':
      break;
    }

    for (var i = 0; i < inputFeat.length; i++) {
      if (inputFeat[i].checked === true) {
        window.data.cloneHomes = window.data.cloneHomes.filter(function(home) {
          return home.offer.features.indexOf(inputFeat[i].value) > -1;
        });
      }
    }

    debounce(500);

  });

  })();
