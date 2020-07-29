'use strict';

(function () {
  // константы
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;


  // нахожу поле адреса и сразу туда вписываю значение центра главного пина
  window.dom.advertAddressInput.value = Math.round(window.dom.mainPin.offsetLeft + window.pin.MainSize.WIDTH / 2) + ', ' + Math.round(window.dom.mainPin.offsetTop + window.pin.MainSize.HEIGHT / 2);


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
    for (var j = 0; j < window.dom.adFormFieldsets.length; j++) {
      window.dom.adFormFieldsets[j].disabled = true;
    }
    for (var k = 0; k < window.dom.mapFilters.length; k++) {
      window.dom.mapFilters[k].disabled = true;
    }
  };


  // функция, которая будет менять в поле цены плейсхолдер и минимальное значение в зависимости от выбранного типа жилья
  var onTypeAdvertSelectChange = function (evt) {
    window.utils.setAttribute(window.dom.priceAdvertInput, 'placeholder', priceTypeToRange[evt.target.value]);
    window.utils.setAttribute(window.dom.priceAdvertInput, 'min', priceTypeToRange[evt.target.value]);
  };


  var disableOptions = function (value, options, data) {
    for (var i = 0; i < options.length; i++) {
      if (!data[value].includes(window.dom.guestsAdvertSelect.options[i].value)) {
        options[i].disabled = true;
      } else {
        options[i].disabled = false;
        options[i].selected = true;
      }
    }
  };
  // функция, которая дизейблит варианты количества гостей, если они не соотвествуют условию
  var onRoomsAdvertSelectChange = function (evt) {
    var guestsOptions = window.dom.guestsAdvertSelect.options;
    disableOptions(evt.target.value, guestsOptions, roomsForGuestsMap);
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

  var switchInvalidStyles = function (element, state) {
    element.classList[state]('ad-form__input--error')
  }


  var deletesErrorStyles = function () {
    Array.from(window.dom.adForm.children).forEach(function (child) {
      var errorInput = child.querySelector('.ad-form__input--error');
      if (errorInput) {
        switchInvalidStyles(errorInput, 'remove')
      }
    })
  }

  // функция обработки события невалидности поля цены
  var onPriceAdvertInputInvalid = function () {
    switchInvalidStyles(window.dom.priceAdvertInput, 'add')
  };

  // функция обработки события невалидности поля заголовка
  var onTitleAdvertInputInvalid = function () {
    switchInvalidStyles(window.dom.titleAdvertInput, 'add')
    if (window.dom.titleAdvertInput.validity.tooShort) {
      window.dom.titleAdvertInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (window.dom.titleAdvertInput.validity.tooLong) {
      window.dom.titleAdvertInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (window.dom.titleAdvertInput.validity.valueMissing) {
      window.dom.titleAdvertInput.setCustomValidity('Вы не указали заголовок объявления');
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

  // функция включения состояния формы
  var switchFormState = function (state) {
    for (var j = 0; j < window.dom.adFormFieldsets.length; j++) {
      window.dom.adFormFieldsets[j].disabled = state;
    }
    for (var k = 0; k < window.dom.mapFilters.length; k++) {
      window.dom.mapFilters[k].disabled = state;
    }
  }

  // функция высчитывает координаты пина главного, подставляет их в input
  var changeAdvertAddressInputValue = function (left, top) {
    window.dom.advertAddressInput.value = Math.round(left + window.pin.MainSize.WIDTH / 2) + ', ' + Math.round(top + window.pin.MainSize.HEIGHT + window.pin.MainSize.TAIL);
  };


  // функция, которая сработает в случае удачной отправки формы (деактивирует карту и отображает попап успеха)
  var onSuccessRequest = function () {
    window.dom.adForm.reset();
    window.map.deactivate();
    window.render.message('success');
  };

  // функция, которая сработает в случае неудачной отправки формы (отображает попап неуспеха)
  var onErrorRequest = function () {
    window.render.message('error');
  };

  // функция, которая будет срабатывать при отправке формы
  var onSubmitAdForm = function (evt) {
    evt.preventDefault();
    window.backend.requestToServer('POST',
        onSuccessRequest,
        onErrorRequest,
        new FormData(window.dom.adForm)
    );
  };

  // функция, которая сработает при нажатии на кнопку очистки формы
  var onResetFormClick = function (evt) {
    evt.preventDefault();
    window.map.deactivate();
    changeAdvertAddressInputValue(window.pin.MainStartCoord.LEFT, window.pin.MainStartCoord.TOP);
  };

  window.form = {
    switchFormState: switchFormState,
    deletesErrorStyles: deletesErrorStyles,
    changeAdvertAddressInputValue: changeAdvertAddressInputValue,
    onPriceAdvertInputInvalid: onPriceAdvertInputInvalid,
    onTitleAdvertInputInput: onTitleAdvertInputInput,
    onTitleAdvertInputInvalid: onTitleAdvertInputInvalid,
    onTypeAdvertSelectChange: onTypeAdvertSelectChange,
    onRoomsAdvertSelectChange: onRoomsAdvertSelectChange,
    onCheckInSelectChange: onCheckInSelectChange,
    onCheckOutSelectChange: onCheckOutSelectChange,
    onResetFormClick: onResetFormClick,
    roomsForGuestsMap: roomsForGuestsMap,
    disableOptions: disableOptions,
    priceTypeToRange: priceTypeToRange,
    onSubmitAdForm: onSubmitAdForm,
  };
})();
