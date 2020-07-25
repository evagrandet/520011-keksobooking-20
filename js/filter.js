'use strict';

(function () {

  var ANY_TYPE = 'any';

  var onMapFilterBlockChange = function (evt) {
    var filteredAdverts = window.map.adverts.filter(function (advert) {
      if (evt.target.value === ANY_TYPE) {
        return window.map.adverts;
      } else {
        return advert.offer.type === evt.target.value;
      }
    });
    window.map.updateAdverts(filteredAdverts);
  };

  window.filter = {
    onMapFilterBlockChange: onMapFilterBlockChange,
  };
})();
