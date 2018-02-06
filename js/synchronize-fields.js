'use strict';
(function () {

  window.synchronizeFields = function(mean1, instruction) {
    mean1.addEventListener('change', function() {
      if (typeof instruction === 'function') {
        instruction();
      }
    });
  };

})();
