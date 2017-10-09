'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHEK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOMES_COUNT = 8;
  var START_PRACE = 1000;
  var START_ROOM = 1;
  var START_X = 300;
  var START_Y = 100;
  var homes = [];
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');

  function createNumber(n) {
    return Math.floor(Math.random() * n);
  }

  function createHome() {
    for (var i = 0; i < HOMES_COUNT; i++) {
      var ava = i + 1;

      var location = {
        x: START_X + createNumber(600),
        y: START_Y + createNumber(400)
      };

      homes[i] = {
        author: {
          avatar: 'img/avatars/user0' + ava + '.png',
        },
        offer: {
          title: TITLES[i],
          address: location.x + ', ' + location.y,
          price: START_PRACE + createNumber(999000),
          type: TYPES[createNumber(TYPES.length)],
          rooms: START_ROOM + createNumber(4),
          guests: createNumber(10),
          checkin: CHEK[createNumber(CHEK.length)],
          checkout: CHEK[createNumber(CHEK.length)],
          features: FEATURES.slice(0, createNumber(FEATURES.length)),
          description: '',
          photos: []
        },
        location: {
          x: location.x,
          y: location.y
        }
      };
    }
    return homes;
  }

  createHome();

  console.log(homes);

  var renderHome1 = function (home) {
    var place = '<div class="pin" style="left:' + (home.location.x - 28) + 'px; top:' + (home.location.y - 75) + 'px"><img src="' + home.author.avatar + '" class="rounded" width="40" height="40"></div>';

    return place;
  };

  var renderHome2 = function (home) {
    var oneHome = lodgeTemplate.cloneNode(true);

    oneHome.querySelector('.lodge__title').textContent = home.offer.title;
    oneHome.querySelector('.lodge__address').textContent = home.offer.address;
    oneHome.querySelector('.lodge__price').textContent = home.offer.price + '&#x20bd;/ночь';

    switch (home.offer.type) {
      case 'flat':
        oneHome.querySelector('.lodge__type').textContent = 'Квартира';
        break;
      case 'house':
        oneHome.querySelector('.lodge__type').textContent = 'Дом';
        break;
      case 'bungalo':
        oneHome.querySelector('.lodge__type').textContent = 'Бунгало';
        break;
    }

    oneHome.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + home.offer.guests + ' гостей в ' + home.offer.rooms + ' комнатах';
    oneHome.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + home.offer.checkin + ', выезд до ' + home.offer.checkout;

    for (var i = 0; i < home.offer.features.length; i++) {
      oneHome.querySelector('.lodge__features').innerHTML = '<span class = feature__image feature__image--' + home.offer.features[i] + '></span>';
    }

    oneHome.querySelector('.lodge__description').textContent = home.offer.description;
    offerDialog.querySelector('.dialog__title').src = home.author.avatar;
    return oneHome;
  };

  for (var i = 0; i < homes.length; i++) {
    tokyoPin.insertAdjacentHTML('beforeend', renderHome1(homes[i]));
  }
  console.log(renderHome2(homes[0]));

  offerDialog.replaceChild(renderHome2(homes[0]), dialogPanel);
})();
