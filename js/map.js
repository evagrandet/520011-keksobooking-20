'use strict';

(function () {
  var adverts = [];
  // функция, которая отработает в случае успешной загрузки данных
  var onSuccessLoad = function (data) {
    adverts = data;
    window.render.renderAdverts(adverts);
  };

  // функция, которая срабатывает при взаимодействии с главным пином (удаляются классы у блоков карты и формы, перевожу поля формы и фильтра в активное состояние, меняю значение адреса главной метки [смещаю его с центра на ее 'хвост'], затем выключаю поле адреса)
  var activateMap = function () {
    window.backend.requestToServer('GET', onSuccessLoad, window.utils.renderError); // обращение к бэку за данными
    window.dom.mapBlock.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');
    // вызываю функции включения форм и определения адреса главного пина
    window.form.enableForms();
    window.form.changeAdvertAddressInputValue();

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

    // удаляю обработчики событий взаимодействия с главным пином
    window.dom.mainPin.removeEventListener('mousedown', window.pin.onMainPinMousedown);
    window.dom.mainPin.removeEventListener('keydown', window.pin.onMainPinKeydown);
  };

  var deactivateMap = function () {
    window.dom.mapBlock.classList.add('map--faded');
    window.dom.adForm.classList.add('ad-form--disabled');

    // удаление всех обработчиков событий
    window.dom.priceAdvertInput.removeEventListener('invalid', window.form.onPriceAdvertInputInvalid);
    window.dom.titleAdvertInput.removeEventListener('input', window.form.onTitleAdvertInputInput);
    window.dom.titleAdvertInput.removeEventListener('invalid', window.form.onTitleAdvertInputInvalid);
    window.dom.typeAdvertSelect.removeEventListener('change', window.form.onTypeAdvertSelectChange);
    window.dom.roomsAdvertSelect.removeEventListener('change', window.form.onRoomsAdvertSelectChange);
    window.dom.checkInSelect.removeEventListener('change', window.form.onCheckInSelectChange);
    window.dom.checkOutSelect.removeEventListener('change', window.form.onCheckOutSelectChange);

  };


  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };

})();
