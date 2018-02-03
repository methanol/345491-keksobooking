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
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var homes = [];
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');

  var dialog = document.querySelector('.dialog');
  var pinPrev = 0;
  var dialogClose = document.querySelector('.dialog__close');

  window.data.createHome();

  var pinStreet = document.querySelectorAll('.pin');

  function renderHome3(lane) {
    for (var i = 0; i < lane.length; i++) {
      if (pinPrev == lane[i]) {
        offerDialog.replaceChild(window.card.renderHome2(window.data.homes[(i-1)]), offerDialog.children[1]);
      }
    }
  }

  tokyoPin.addEventListener('click', function(evt) {
    if (pinPrev) {
      pinPrev.classList.remove('pin--active');
    }

    evt.target.parentElement.classList.add('pin--active');
    pinPrev = evt.target.parentElement;
    dialog.classList.remove('hidden');

    renderHome3(pinStreet);

    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeHome();
      }
    });
  });

  tokyoPin.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (pinPrev) {
        pinPrev.classList.remove('pin--active');
      }

      evt.target.classList.add('pin--active');
      pinPrev = evt.target;
      dialog.classList.remove('hidden');

      renderHome3(pinStreet);

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeHome();
        }
      });
    }
  });

  dialogClose.addEventListener('click', closeHome);

  dialogClose.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeHome();
    }
  });

  function closeHome() {
    dialog.classList.add('hidden');
    pinPrev.classList.remove('pin--active');
  }

})();
