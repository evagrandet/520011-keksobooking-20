'use strict';

(function () {

  var ANY_TYPE = 'any';
  var Price = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var PriceLimit = {
    LOW: 10000,
    MIDDLE: 50000,
  };

  // функция, которая применяет все сильтры и возвращает список объявлений, подходящий всем условиям
  var applyFilters = function (adverts) {
    var filteredAdverts = [];
    for (var i = 0; i < adverts.length; i++) {
      var advert = adverts.length[i];
      if (filterHousingType(advert) &&
          filterHousingPrice(advert) &&
          filterHousingRooms(advert) &&
          filterHousingGuests(advert) &&
          filterHousingFeatures(advert)
      ) {
        filteredAdverts.push(advert);
      }
      if (filteredAdverts.length === window.render.ADVERT_COUNT) {
        break;
      }
    }

    return filteredAdverts;
  };


  // функция, которая сработает на изменении блока с фильтрами (внутри происходит вызов обновления объявлений, удовлетворяющих всем условиям)
  var onMapFilterBlockChange = function () {
    var filteredAdverts = applyFilters(window.map.adverts);
    window.map.updateAdverts(filteredAdverts);
  };

  // функция фильтровки по типу
  var filterHousingType = function (advert) {
    return (advert.offer.type === window.dom.housingTypeFilter.value || window.dom.housingTypeFilter.value === ANY_TYPE) ? true : false;
  };

  // функция фильтровки по цене
  var filterHousingPrice = function (advert) {
    var result;

    switch (window.dom.housingPriceFilter.value) {
      case Price.LOW:
        result = advert.offer.price < PriceLimit.LOW;
        break;
      case Price.MIDDLE:
        result = advert.offer.price >= PriceLimit.LOW && advert.offer.price <= PriceLimit.MIDDLE;
        break;
      case Price.HIGH:
        result = advert.offer.price > PriceLimit.MIDDLE;
        break;
      case ANY_TYPE:
      default:
        result = true;
        break;
    }
    return result;
  };

  // функция фильтровки по количеству комнат
  var filterHousingRooms = function (advert) {
    return (advert.offer.rooms === Number(window.dom.housingRoomsFilter.value) || window.dom.housingRoomsFilter.value === ANY_TYPE) ? true : false;
  };

  // функция фильтровки по количеству гостей
  var filterHousingGuests = function (advert) {
    return (window.dom.housingGuestsFilter.value === ANY_TYPE || advert.offer.guests === Number(window.dom.housingGuestsFilter.value)) ? true : false;

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
