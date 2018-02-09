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
  var START_Y = 200;


  function createNumber(n) {
    return Math.round(Math.random() * (n));
  }

  window.data = {
    homes: [],
    successHandler: function(data) {
      for (var i = 0; i < data.length; i++) {

        window.data.homes[i] = {
          author: {
            avatar: data[i].author.avatar,
          },
          offer: {
            title: data[i].offer.title,
            address: data[i].offer.address,
            price: data[i].offer.price,
            type: data[i].offer.type,
            rooms: data[i].offer.rooms,
            guests: data[i].offer.guests,
            checkin: data[i].offer.checkin,
            checkout: data[i].offer.checkout,
            features: data[i].offer.features,
            description: data[i].offer.description,
            photos: []
          },
          location: {
            x: data[i].location.x,
            y: data[i].location.y
          }
        };
      };
      console.log(window.data.homes.length);
      console.log(window.data.homes);
    },
    createHome: function() {
      for (var i = 0; i < HOMES_COUNT; i++) {
        var ava = i + 1;

        var locationOne = {
          x: START_X + createNumber(600),
          y: START_Y + createNumber(400)
        };

        window.data.homes[i] = {
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
    },
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: silver; color:green;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '35px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();
