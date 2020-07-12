'use strict';

(function () {
  // константы
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;


  // нахожу форму и все ее элементы
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.children;

  // выношу в переменные поля заголовка, цены и типа жилья, поля въезда и выезда в/из жилья, поля количества комнат и вместимости
  var titleAdvertInput = adForm.querySelector('#title');
  var typeAdvertSelect = adForm.querySelector('#type');
  var priceAdvertInput = adForm.querySelector('#price');
  var checkInSelect = adForm.querySelector('#timein');
  var checkOutSelect = adForm.querySelector('#timeout');
  var roomsAdvertSelect = adForm.querySelector('#room_number');
  var guestsAdvertSelect = adForm.querySelector('#capacity');


  // нахожу поле адреса и сразу туда вписываю значение центра главного пина
  var advertAddressInput = adForm.querySelector('#address');
  advertAddressInput.value = Math.round(window.pin.mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.pin.mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);

  // нахожу все дочерние элементы у блока с фильтрами карты
  var mapFilters = window.map.mapBlock.querySelector('.map__filters').children;

  // структура данных для выражения типа и минимальной цены жилья
  var priceTypeToRange = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  // структура данных для связывания количества комнат с возможным количеством гостей
  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  // при загрузке страницы сразу прохожусь по всем полям форм/фильтров и перевожу их в нактивное состояние
  window.onload = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
    for (var k = 0; k < mapFilters.length; k++) {
      mapFilters[k].disabled = true;
    }
  };

  // функция, которая будет менять в поле цены плейсхолдер и минимальное значение в зависимости от выбранного типа жилья
  var onTypeAdvertSelectChange = function (evt) {
    priceAdvertInput.placeholder = priceTypeToRange[evt.target.value];
    priceAdvertInput.min = priceTypeToRange[evt.target.value];
  };


  // функция, которая дизейблит варианты количества гостей, если они не соотвествуют условию
  var onRoomsAdvertSelectChange = function (evt) {
    var guestsOptions = guestsAdvertSelect.options;
    for (var m = 0; m < guestsOptions.length; m++) {
      if (!roomsForGuestsMap[evt.target.value].includes(guestsAdvertSelect.options[m].value)) {
        guestsOptions[m].disabled = true;
      } else {
        guestsOptions[m].disabled = false;
        guestsOptions[m].selected = true;
      }
    }
  };


  // функция для поля въезда
  var onCheckInSelectChange = function (evt) {
    synchronizeTime(evt, checkOutSelect);
  };

  // функция для поля выезда
  var onCheckOutSelectChange = function (evt) {
    synchronizeTime(evt, checkInSelect);
  };

  // функция, которая синхронизирует поля въезда-выезда между собой
  var synchronizeTime = function (evt, element) {
    element.value = evt.target.value;
  };

  // функция обработки события невалидности поля цены
  var onPriceAdvertInputInvalid = function () {
    if (priceAdvertInput.validity.rangeUnderflow) {
      priceAdvertInput.setCustomValidity('Выбранная Вами цена меньше минимально допустимой цены в ' + priceAdvertInput.min + ' рублей');
    } else {
      priceAdvertInput.setCustomValidity('');
    }
  };

  // функция обработки события невалидности поля заголовка
  var onTitleAdvertInputInvalid = function () {
    if (titleAdvertInput.validity.tooShort) {
      titleAdvertInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleAdvertInput.validity.tooLong) {
      titleAdvertInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleAdvertInput.validity.valueMissing) {
      titleAdvertInput.setCustomValidity('Обязательное поле');
    } else {
      titleAdvertInput.setCustomValidity('');
    }
  };

  // функция обработки события ввода заголовка
  var onTitleAdvertInputInput = function () {
    var valueLength = titleAdvertInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleAdvertInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleAdvertInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleAdvertInput.setCustomValidity('');
    }
  };

  // функция включения форм
  var enableForms = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }
    for (var k = 0; k < mapFilters.length; k++) {
      mapFilters[k].disabled = false;
    }
  };

  // функция высчитывает координаты пина главного, подставляет их в input и отключает его
  var changeAdvertAddressInputValue = function () {
    advertAddressInput.value = Math.round(window.pin.mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.pin.mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL);
    advertAddressInput.disabled = true;
  };


  var onSubmitAdForm = function (evt) {
    evt.preventDefault();
    // удаление всех обработчиков событий
    priceAdvertInput.removeEventListener('invalid', onPriceAdvertInputInvalid);
    titleAdvertInput.removeEventListener('input', onTitleAdvertInputInput);
    titleAdvertInput.removeEventListener('invalid', onTitleAdvertInputInvalid);
    typeAdvertSelect.removeEventListener('change', onTypeAdvertSelectChange);
    roomsAdvertSelect.removeEventListener('change', onRoomsAdvertSelectChange);
    checkInSelect.removeEventListener('change', onCheckInSelectChange);
    checkOutSelect.removeEventListener('change', onCheckOutSelectChange);
  };

  adForm.addEventListener('submit', onSubmitAdForm);


  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    enableForms: enableForms,
    changeAdvertAddressInputValue: changeAdvertAddressInputValue,
    priceAdvertInput: priceAdvertInput,
    titleAdvertInput: titleAdvertInput,
    typeAdvertSelect: typeAdvertSelect,
    roomsAdvertSelect: roomsAdvertSelect,
    checkInSelect: checkInSelect,
    checkOutSelect: checkOutSelect,
    onPriceAdvertInputInvalid: onPriceAdvertInputInvalid,
    onTitleAdvertInputInput: onTitleAdvertInputInput,
    onTitleAdvertInputInvalid: onTitleAdvertInputInvalid,
    onTypeAdvertSelectChange: onTypeAdvertSelectChange,
    onRoomsAdvertSelectChange: onRoomsAdvertSelectChange,
    onCheckInSelectChange: onCheckInSelectChange,
    onCheckOutSelectChange: onCheckOutSelectChange
  };
})();
