'use strict';

(function () {
  // константы
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var adForm = document.querySelector('.ad-form');
  // нахожу все дочерние элементы у блока с фильтрами карты
  var adFormFieldsets = window.dom.adForm.children;


  // нахожу поле адреса и сразу туда вписываю значение центра главного пина
  window.dom.advertAddressInput.value = Math.round(window.dom.mainPin.offsetLeft + window.pin.MainPinSize.WIDTH / 2) + ', ' + Math.round(window.dom.mainPin.offsetTop + window.pin.MainPinSize.HEIGHT / 2);


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
    for (var k = 0; k < window.dom.mapFilters.length; k++) {
      window.dom.mapFilters[k].disabled = true;
    }
  };

  // функция, которая будет менять в поле цены плейсхолдер и минимальное значение в зависимости от выбранного типа жилья
  var onTypeAdvertSelectChange = function (evt) {
    window.dom.priceAdvertInput.placeholder = priceTypeToRange[evt.target.value];
    window.dom.priceAdvertInput.min = priceTypeToRange[evt.target.value];
  };


  // функция, которая дизейблит варианты количества гостей, если они не соотвествуют условию
  var onRoomsAdvertSelectChange = function (evt) {
    var guestsOptions = window.dom.guestsAdvertSelect.options;
    for (var m = 0; m < guestsOptions.length; m++) {
      if (!roomsForGuestsMap[evt.target.value].includes(window.dom.guestsAdvertSelect.options[m].value)) {
        guestsOptions[m].disabled = true;
      } else {
        guestsOptions[m].disabled = false;
        guestsOptions[m].selected = true;
      }
    }
  };


  // функция для поля въезда
  var onCheckInSelectChange = function (evt) {
    synchronizeTime(evt, window.dom.checkOutSelect);
  };

  // функция для поля выезда
  var onCheckOutSelectChange = function (evt) {
    synchronizeTime(evt, window.dom.checkInSelect);
  };

  // функция, которая синхронизирует поля въезда-выезда между собой
  var synchronizeTime = function (evt, element) {
    element.value = evt.target.value;
  };

  // функция обработки события невалидности поля цены
  var onPriceAdvertInputInvalid = function () {
    if (window.dom.priceAdvertInput.validity.rangeUnderflow) {
      window.dom.priceAdvertInput.setCustomValidity('Выбранная Вами цена меньше минимально допустимой цены в ' + window.dom.priceAdvertInput.min + ' рублей');
    } else {
      window.dom.priceAdvertInput.setCustomValidity('');
    }
  };

  // функция обработки события невалидности поля заголовка
  var onTitleAdvertInputInvalid = function () {
    if (window.dom.titleAdvertInput.validity.tooShort) {
      window.dom.titleAdvertInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (window.dom.titleAdvertInput.validity.tooLong) {
      window.dom.titleAdvertInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (window.dom.titleAdvertInput.validity.valueMissing) {
      window.dom.titleAdvertInput.setCustomValidity('Обязательное поле');
    } else {
      window.dom.titleAdvertInput.setCustomValidity('');
    }
  };

  // функция обработки события ввода заголовка
  var onTitleAdvertInputInput = function () {
    var valueLength = window.dom.titleAdvertInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      window.dom.titleAdvertInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      window.dom.titleAdvertInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      window.dom.titleAdvertInput.setCustomValidity('');
    }
  };

  var onAdFormInvalid = function (evt) {
    console.log(evt)
  }

  // функция включения форм
  var enableForms = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }
    for (var k = 0; k < window.dom.mapFilters.length; k++) {
      window.dom.mapFilters[k].disabled = false;
    }
  };

  var disableForms = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
    for (var k = 0; k < window.dom.mapFilters.length; k++) {
      window.dom.mapFilters[k].disabled = true;
    }
  };

  // функция высчитывает координаты пина главного, подставляет их в input
  var changeAdvertAddressInputValue = function (left, top) {
    window.dom.advertAddressInput.value = Math.round(left + window.pin.MainPinSize.WIDTH / 2) + ', ' + Math.round(top + window.pin.MainPinSize.HEIGHT + window.pin.MainPinSize.TAIL);
  };


  // функция, которая сработает в случае удачной отправки формы (деактивирует карту и отображает попап успеха)
  var onSuccessRequest = function () {
    window.dom.adForm.reset();
    window.map.deactivateMap();
    disableForms();
    window.render.renderMessage('success');
  };

  // функция, которая сработает в случае неудачной отправки формы (отображает попап неуспеха)
  var onErrorRequest = function () {
    window.render.renderMessage('error');
  };

  // функция, которая будет срабатывать при отправке формы
  var onSubmitAdForm = function (evt) {
    evt.preventDefault();
    window.backend.requestToServer('POST',
        onSuccessRequest,
        onErrorRequest,
        new FormData(adForm)
    );
  };

  window.dom.adForm.addEventListener('submit', onSubmitAdForm);

  // функция, которая сработает при нажатии на кнопку очистки формы
  var onResetFormClick = function (evt) {
    evt.preventDefault();
    window.map.deactivateMap();
    changeAdvertAddressInputValue(window.pin.MainPinStartCoord.LEFT, window.pin.MainPinStartCoord.TOP);
  };

  window.form = {
    enableForms: enableForms,
    changeAdvertAddressInputValue: changeAdvertAddressInputValue,
    onPriceAdvertInputInvalid: onPriceAdvertInputInvalid,
    onTitleAdvertInputInput: onTitleAdvertInputInput,
    onTitleAdvertInputInvalid: onTitleAdvertInputInvalid,
    onAdFormInvalid: onAdFormInvalid,
    onTypeAdvertSelectChange: onTypeAdvertSelectChange,
    onRoomsAdvertSelectChange: onRoomsAdvertSelectChange,
    onCheckInSelectChange: onCheckInSelectChange,
    onCheckOutSelectChange: onCheckOutSelectChange,
    onResetFormClick: onResetFormClick
  };
})();
