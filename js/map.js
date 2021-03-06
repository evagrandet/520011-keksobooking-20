'use strict';

(function () {
  var MapCoord = {
    TOP_Y: 130,
    BOTTOM_Y: 630,
    LEFT_X: 0,
    RIGHT_X: 1200
  };

  var updateAdverts = function (data) {
    window.card.close();
    window.pin.clear();
    window.render.adverts(data);
  };


  // функция, которая отработает в случае успешной загрузки данных
  var onSuccessLoad = function (data) {
    window.map.adverts = data;
    updateAdverts(window.map.adverts);
    window.dom.mapBlock.classList.remove('map--faded');
  };

  var onErrorLoad = function () {
    window.render.message('error');
    deactivateMap();
  };

  // функция, которая срабатывает при взаимодействии с главным пином (удаляются классы у блоков карты и формы, перевожу поля формы и фильтра в активное состояние, меняю значение адреса главной метки [смещаю его с центра на ее 'хвост'], затем выключаю поле адреса)
  var activateMap = function () {
    window.map.isMapActivated = true;
    window.backend.requestToServer('GET', onSuccessLoad, onErrorLoad); // обращение к бэку за данными
    window.dom.adForm.classList.remove('ad-form--disabled');
    // вызываю функции включения форм и определения адреса главного пина
    window.form.switchFormState(false);
    window.form.disableOptions(window.dom.roomsAdvertSelect.value, window.dom.guestsAdvertSelect.options, window.form.roomsForGuestsMap);
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

    window.dom.mapFilterBlock.addEventListener('change', window.utils.debounce(window.filter.onMapFilterBlockChange));


    window.dom.resetForm.addEventListener('click', window.form.onResetFormClick);

    // удаляю обработчики событий взаимодействия с главным пином
    window.dom.mainPin.removeEventListener('keydown', window.pin.onMainPinKeydown);

    window.dom.adForm.addEventListener('submit', window.form.onSubmitAdForm);
  };


  // функция сброса страницы, внутри которой будут сбрасываться все формы/фильтры, закрываться карточки, удаляться пины похожих объявлений и главный пин будет возвращаться на центр карты
  var resetPage = function () {
    window.dom.mapFilterBlock.reset();
    window.dom.adForm.reset();
    window.card.close();
    window.pin.clear();
    window.dom.mainPin.style.left = window.pin.MainStartCoord.LEFT + 'px';
    window.dom.mainPin.style.top = window.pin.MainStartCoord.TOP + 'px';

  };

  // функция деактивации страницы, внутри которой
  var deactivateMap = function () {
    // будет обновляться флаг для невозможности перетаскивания
    window.map.isMapActivated = false;
    window.form.deletesErrorStyles();
    // добавляться классы
    window.dom.mapBlock.classList.add('map--faded');
    window.dom.adForm.classList.add('ad-form--disabled');
    // обновление списка объявлений безо всяких фильтров
    updateAdverts(window.map.adverts);
    // функция обнуление страницы
    resetPage();
    // переключение формы в отключенное состояние
    window.form.switchFormState(true);
    window.utils.setAttribute(window.dom.priceAdvertInput, 'placeholder', window.form.priceTypeToRange[window.dom.typeAdvertSelect.value]);
    // пересчет данных для инпута поля адреса
    window.form.changeAdvertAddressInputValue(window.pin.MainStartCoord.LEFT, (window.pin.MainStartCoord.TOP - window.pin.MainSize.TAIL - window.pin.MainSize.HEIGHT / 2));


    // удаление всех обработчиков событий
    window.dom.priceAdvertInput.removeEventListener('invalid', window.form.onPriceAdvertInputInvalid);
    window.dom.titleAdvertInput.removeEventListener('input', window.form.onTitleAdvertInputInput);
    window.dom.titleAdvertInput.removeEventListener('invalid', window.form.onTitleAdvertInputInvalid);
    window.dom.typeAdvertSelect.removeEventListener('change', window.form.onTypeAdvertSelectChange);
    window.dom.roomsAdvertSelect.removeEventListener('change', window.form.onRoomsAdvertSelectChange);
    window.dom.checkInSelect.removeEventListener('change', window.form.onCheckInSelectChange);
    window.dom.checkOutSelect.removeEventListener('change', window.form.onCheckOutSelectChange);
    window.dom.resetForm.removeEventListener('click', window.form.onResetFormClick);
    window.dom.adForm.removeEventListener('submit', window.form.onSubmitAdForm);
  };


  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    Coord: MapCoord,
    updateAdverts: updateAdverts,
    resetPage: resetPage
  };

})();
