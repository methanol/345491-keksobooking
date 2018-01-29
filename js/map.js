'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHEK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOMES_COUNT = 8;
  var START_PRICE = 1000;
  var START_ROOM = 1;
  var START_X = 300;
  var START_Y = 100;
  var homes = [];
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');

  function createNumber(n) {
    return Math.round(Math.random() * (n));
  }

  function createHome() {
    for (var i = 0; i < HOMES_COUNT; i++) {
      var ava = i + 1;

      var locationOne = {
        x: START_X + createNumber(600),
        y: START_Y + createNumber(400)
      };

      homes[i] = {
        author: {
          avatar: 'img/avatars/user0' + ava + '.png',
        },
        offer: {
          title: TITLES[i],
          address: locationOne.x + ', ' + locationOne.y,
          price: START_PRICE + createNumber(999000),
          type: TYPES[createNumber(TYPES.length - 1)],
          rooms: START_ROOM + createNumber(4),
          guests: createNumber(10),
          checkin: CHEK[createNumber(CHEK.length - 1)],
          checkout: CHEK[createNumber(CHEK.length - 1)],
          features: FEATURES.slice(0, createNumber(FEATURES.length - 1)),
          description: '',
          photos: []
        },
        location: {
          x: locationOne.x,
          y: locationOne.y
        }
      };
    };
  };

  createHome();

  function renderHome1(home) {
    var place = '<div class="pin" style="left:' + (home.location.x - 28) + 'px; top:' + (home.location.y - 75) + 'px"><img src="' + home.author.avatar + '" class="rounded" width="40" height="40"></div>';

    return place;
  };

  function renderHome2(home) {
    var oneHome = lodgeTemplate.cloneNode(true);

    oneHome.querySelector('.lodge__title').textContent = home.offer.title;
    oneHome.querySelector('.lodge__address').textContent = home.offer.address;
    oneHome.querySelector('.lodge__price').textContent = home.offer.price + ' P/ночь';

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
      oneHome.querySelector('.lodge__features').insertAdjacentHTML('beforeend', '<span class = "feature__image feature__image--' + home.offer.features[i] + '"></span>');
    }

    oneHome.querySelector('.lodge__description').textContent = home.offer.description;
    offerDialog.querySelector('.dialog__title').src = home.author.avatar;
    return oneHome;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < homes.length; i++) {
    var element = document.createElement('div');
    element.innerHTML = renderHome1(homes[i]);
    fragment.appendChild(element);
  }

  tokyoPin.appendChild(fragment);

  //console.log(element);

  offerDialog.replaceChild(renderHome2(homes[0]), dialogPanel);
})();
