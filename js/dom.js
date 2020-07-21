'use strict';

(function () {
  // нахожу форму и все ее элементы
  var adForm = document.querySelector('.ad-form');

  // выношу в переменные поля заголовка, цены и типа жилья, поля въезда и выезда в/из жилья, поля количества комнат и вместимости
  var titleAdvertInput = adForm.querySelector('#title');
  var typeAdvertSelect = adForm.querySelector('#type');
  var priceAdvertInput = adForm.querySelector('#price');
  var checkInSelect = adForm.querySelector('#timein');
  var checkOutSelect = adForm.querySelector('#timeout');
  var roomsAdvertSelect = adForm.querySelector('#room_number');
  var guestsAdvertSelect = adForm.querySelector('#capacity');
  var advertAddressInput = adForm.querySelector('#address');

  // получаю элемент карты из DOM, записываю его в переменную
  var mapBlock = document.querySelector('.map');

  var mapFilters = mapBlock.querySelector('.map__filters').children;


  // получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
  var mapPinsList = mapBlock.querySelector('.map__pins');

  // нахожу главный пин, при взаимодействии с которым происходит переход режима карты из неактивного в активный
  var mainPin = mapBlock.querySelector('.map__pin--main');


  window.dom = {
    adForm: adForm,
    titleAdvertInput: titleAdvertInput,
    typeAdvertSelect: typeAdvertSelect,
    priceAdvertInput: priceAdvertInput,
    checkInSelect: checkInSelect,
    checkOutSelect: checkOutSelect,
    roomsAdvertSelect: roomsAdvertSelect,
    guestsAdvertSelect: guestsAdvertSelect,
    advertAddressInput: advertAddressInput,
    mapFilters: mapFilters,
    mapPinsList: mapPinsList,
    mainPin: mainPin,
    mapBlock: mapBlock,
  };
})();
