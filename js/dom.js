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

  var mapFilterBlock = mapBlock.querySelector('.map__filters-container');
  var mapFilters = mapFilterBlock.querySelector('.map__filters').children;


  // получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
  var mapPinsList = mapBlock.querySelector('.map__pins');

  // нахожу главный пин, при взаимодействии с которым происходит переход режима карты из неактивного в активный
  var mainPin = mapBlock.querySelector('.map__pin--main');

  // получаю шаблон метки, добираюсь до разметки внутри
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // получаю шаблон карточки объявляения, добираюсь до разметки внутри
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // шаблоны сообщений ошибки и успеха
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error')


  // создаю 'контейнер' будущей разметки всех элементов, отрендеренных по шаблону
  var fragment = document.createDocumentFragment();


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
    pinTemplate: pinTemplate,
    fragment: fragment,
    cardTemplate: cardTemplate,
    mapFilterBlock: mapFilterBlock,
    successMessage: successMessage,
    errorMessage: errorMessage
  };
})();
