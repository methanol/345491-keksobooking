'use strict';
(function () {

  window.synchronizeFields = function(instruction) {
    if (typeof instruction === 'function') {
      instruction();
    }
  };

})();
