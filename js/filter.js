'use strict';

(function () {

  var ANY_TYPE = 'any';

  // функция, которая применяет все сильтры и возвращает список объявлений, подходящий всем условиям
  var applyFilters = function (adverts) {
    return adverts
      .filter(function (advert) {
        return (
          filterHousingType(advert) &&
          filterHousingPrice(advert) &&
          filterHousingRooms(advert) &&
          filterHousingGuests(advert) &&
          filterHousingFeatures(advert)
        );
      });
  };


  // функция, которая сработает на изменении блока с фильтрами (внутри происходит вызов обновления объявлений, удовлетворяющих всем условиям)
  var onMapFilterBlockChange = function () {
    var filteredAdverts = applyFilters(window.map.adverts);
    window.map.updateAdverts(filteredAdverts);
  };

  // функция фильтровки по типу
  var filterHousingType = function (advert) {
    return window.dom.housingTypeFilter.value === ANY_TYPE ? true : advert.offer.type === window.dom.housingTypeFilter.value;
  };

  // функция фильтровки по цене
  var filterHousingPrice = function (advert) {
    var result;

    switch (window.dom.housingPriceFilter.value) {
      case 'low':
        result = advert.offer.price < 10000;
        break;
      case 'middle':
        result = advert.offer.price >= 10000 && advert.offer.price <= 50000;
        break;
      case 'high':
        result = advert.offer.price > 50000;
        break;
      case 'any':
      default:
        result = true;
        break;
    }
    return result;
  };

  // функция фильтровки по количеству комнат
  var filterHousingRooms = function (advert) {
    return window.dom.housingRoomsFilter.value === ANY_TYPE ? true : advert.offer.rooms === Number(window.dom.housingRoomsFilter.value);
  };

  // функция фильтровки по количеству гостей
  var filterHousingGuests = function (advert) {
    return window.dom.housingGuestsFilter.value === ANY_TYPE ? true : advert.offer.guests === Number(window.dom.housingGuestsFilter.value);

  };

  // функция фильтровки по особенностям
  var filterHousingFeatures = function (advert) {
    return Array.from(window.dom.housingFeatures).filter(function (checkbox) {
      return checkbox.checked;
    }).every(function (feature) {
      return advert.offer.features.indexOf(feature.value) !== -1;
    });
  };
  window.filter = {
    onMapFilterBlockChange: onMapFilterBlockChange,
  };
})();
