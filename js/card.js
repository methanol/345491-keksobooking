'use strict';
(function () {

  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');

  window.card = {
    renderHome2: function(home) {
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
      offerDialog.querySelector('.dialog__title').children[0].src = home.author.avatar;
      return oneHome;

    }
  };

  })();
