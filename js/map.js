'use strict';

(function () {
  var MapCoord = {
    topY: 130,
    bottomY: 630,
    leftX: 0,
    rightX: 1200
  };

  var updateAdverts = function (data) {
    window.card.closeCard();
    window.pin.clearPins();
    window.render.renderAdverts(data);
  };


  // функция, которая отработает в случае успешной загрузки данных
  var onSuccessLoad = function (data) {
    window.map.adverts = data;
    updateAdverts(window.map.adverts);
  };

  // функция, которая срабатывает при взаимодействии с главным пином (удаляются классы у блоков карты и формы, перевожу поля формы и фильтра в активное состояние, меняю значение адреса главной метки [смещаю его с центра на ее 'хвост'], затем выключаю поле адреса)
  var activateMap = function () {
    window.map.isMapActivated = true;
    window.backend.requestToServer('GET', onSuccessLoad, window.utils.renderError); // обращение к бэку за данными
    window.dom.mapBlock.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');
    // вызываю функции включения форм и определения адреса главного пина
    window.form.enableForms();
    window.form.changeAdvertAddressInputValue(window.dom.mainPin.offsetLeft, window.dom.mainPin.offsetTop);

    // обратботчик события, который сработает, если при отправке данных на сервер выяснится, что пользователь ввел цену меньше, чем необходимо при выбранном типе жилья
    window.dom.priceAdvertInput.addEventListener('invalid', window.form.onPriceAdvertInputInvalid);
    // добавляю для него обработчик события для дополнительной кастомной валидации поля
    window.dom.titleAdvertInput.addEventListener('invalid', window.form.onTitleAdvertInputInvalid);
    // добавляю еще один обработчик, чтобы повысить информативность
    window.dom.titleAdvertInput.addEventListener('input', window.form.onTitleAdvertInputInput);
    // добавляю обработчик события с функцией выше на селект выбора типа жилья
    window.dom.typeAdvertSelect.addEventListener('change', window.form.onTypeAdvertSelectChange);
    // обработчик событий для полей количества комнат
    window.dom.roomsAdvertSelect.addEventListener('change', window.form.onRoomsAdvertSelectChange);
    // добавляю обработчики событий на поля въезда-выезда
    window.dom.checkInSelect.addEventListener('change', window.form.onCheckInSelectChange);
    window.dom.checkOutSelect.addEventListener('change', window.form.onCheckOutSelectChange);

    window.dom.mapFilterBlock.addEventListener('change', window.filter.onMapFilterBlockChange);

    // удаляю обработчики событий взаимодействия с главным пином
    window.dom.mainPin.removeEventListener('keydown', window.pin.onMainPinKeydown);

  };


  window.map = {
    activateMap: activateMap,
    MapCoord: MapCoord,
    updateAdverts: updateAdverts
  };

})();
