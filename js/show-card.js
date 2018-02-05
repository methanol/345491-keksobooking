'use strict';
(function() {
  var offerDialog = document.querySelector('#offer-dialog');

  window.showCard = function(home) {
    offerDialog.replaceChild(window.card.renderHome2(home), offerDialog.children[1]);
  };
})();
