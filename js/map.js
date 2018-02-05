'use strict';
(function () {

  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var pinPrev = 0;
  var dialogClose = document.querySelector('.dialog__close');
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
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeHome();
      }
    });
  });

  tokyoPin.addEventListener('keydown', function(evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      if (pinPrev) {
        pinPrev.classList.remove('pin--active');
      }

      evt.target.classList.add('pin--active');
      pinPrev = evt.target;
      dialog.classList.remove('hidden');

      renderHome3(pinStreet);

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          closeHome();
        }
      });
    }
  });

  dialogClose.addEventListener('click', closeHome);

  dialogClose.addEventListener('keydown', function(evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closeHome();
    }
  });

  function closeHome() {
    dialog.classList.add('hidden');
    pinPrev.classList.remove('pin--active');
  }

  var mainPin = document.querySelector('.pin__main');
  var formAdress = document.getElementById('address');

  mainPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.pageX,
      y: evt.pageY
    };

    function mouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoord.x - moveEvt.pageX,
      y: startCoord.y - moveEvt.pageY
    };

    startCoord = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    console.log(mainPin.parentElement.offsetWidth);

    formAdress.value = 'x: ' + (startCoord.x + 20) + ' y: ' + (startCoord.y + 44);

    if (((moveEvt.pageY > 150) && (moveEvt.pageY < 600)) && (((mainPin.offsetLeft + 20 - shift.x) > 0) && ((mainPin.offsetLeft - shift.x) < (mainPin.parentElement.offsetWidth-40)))) {

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px'
    };

  };

    function mouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

  });


})();
