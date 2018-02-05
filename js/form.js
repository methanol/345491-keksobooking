'use strict';
(function () {
  var goIn = document.getElementById('timein');
  var goOut = document.getElementById('timeout');
  var typeHome = document.getElementById('type');
  var priceHome = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var homeCapacity = document.getElementById('capacity');
  var mainForm = document.querySelector('.notice__form');
  var submitForm = document.querySelector('.form__submit');
  var inputs = mainForm.querySelectorAll('input');
  var errorState = 0;

  function syncTime(first, second) {
    first.addEventListener('change', function() {
      second.value = first.value;
    });
  };

  function syncPrice() {
    typeHome.addEventListener('change', function() {
      switch (typeHome.value) {
        case 'flat':
          priceHome.min = 1000;
          break;
        case 'bungalo':
          priceHome.min = 0;
          break;
        case 'house':
          priceHome.min = 5000;
          break;
        case 'palace':
          priceHome.min = 10000;
          break;
      }
    });
  };

  function syncGuest() {
    roomNumber.addEventListener('change', function() {
      switch (roomNumber.value) {
        case '1':
          homeCapacity.children[0].disabled = true;
          homeCapacity.children[1].disabled = true;
          homeCapacity.children[2].selected = true;
          homeCapacity.children[3].disabled = true;
          break;
        case '2':
          homeCapacity.children[0].disabled = true;
          homeCapacity.children[1].disabled = false;
          homeCapacity.children[2].selected = true;
          homeCapacity.children[3].disabled = true;
          break;
        case '3':
          homeCapacity.children[0].disabled = false;
          homeCapacity.children[1].disabled = false;
          homeCapacity.children[2].selected = true;
          homeCapacity.children[3].disabled = true;
          break;
        case '100':
          homeCapacity.children[0].disabled = true;
          homeCapacity.children[1].disabled = true;
          homeCapacity.children[2].disabled = true;
          homeCapacity.children[3].selected= true;
          break;
      }
    });
  };

  window.synchronizeFields(syncTime(goIn, goOut));
  window.synchronizeFields(syncPrice);
  window.synchronizeFields(syncGuest);

  /*goIn.addEventListener('change', function() {
    goOut.value = goIn.value;
  });*/

  /*typeHome.addEventListener('change', function() {
    switch (typeHome.value) {
      case 'flat':
        priceHome.min = 1000;
        break;
      case 'bungalo':
        priceHome.min = 0;
        break;
      case 'house':
        priceHome.min = 5000;
        break;
      case 'palace':
        priceHome.min = 10000;
        break;
    }
  });*/

  /*roomNumber.addEventListener('change', function() {
    switch (roomNumber.value) {
      case '1':
        homeCapacity.children[0].disabled = true;
        homeCapacity.children[1].disabled = true;
        homeCapacity.children[2].selected = true;
        homeCapacity.children[3].disabled = true;
        break;
      case '2':
        homeCapacity.children[0].disabled = true;
        homeCapacity.children[1].disabled = false;
        homeCapacity.children[2].selected = true;
        homeCapacity.children[3].disabled = true;
        break;
      case '3':
        homeCapacity.children[0].disabled = false;
        homeCapacity.children[1].disabled = false;
        homeCapacity.children[2].selected = true;
        homeCapacity.children[3].disabled = true;
        break;
      case '100':
        homeCapacity.children[0].disabled = true;
        homeCapacity.children[1].disabled = true;
        homeCapacity.children[2].disabled = true;
        homeCapacity.children[3].selected= true;
        break;
    }
  });*/

  submitForm.addEventListener('click', function(evt) {
    errorState = 0;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checkValidity() == false) {
        inputs[i].style.border = '3px dashed red';
        errorState = 1;
        evt.preventDefault();
      } else {
        inputs[i].style.border = '2px solid blue';
      }
    }
  });

  })();
