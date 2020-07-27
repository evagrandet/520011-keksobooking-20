'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var MainPinStartCoord = {
    LEFT: 570,
    TOP: 375
  }

  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    TAIL: 25
  };


  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var clearPins = function () {
    var pins = window.dom.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      window.dom.mapPinsList.removeChild(item);
    });
  };

  // функция, которая будет срабатывать на нажатии левой кнопки мыши, и которая будет активировать карту
  var onMainPinMousedown = function (evt) {
    if (evt.buttons === 1 && !window.map.isMapActivated) {
      window.map.activateMap();
    } else if (evt.buttons === 1 && window.map.isMapActivated) {
      window.dragAndDrop.dragAndDropMainPin(evt);
    }
  };

  // функция, которая будет срабатывать на нажатии кнопки ENTER, и которая будет активировать карту
  var onMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.map.activateMap();
    }
  };

  // добавляю два обработчика событий на главный пин
  window.dom.mainPin.addEventListener('mousedown', onMainPinMousedown);
  window.dom.mainPin.addEventListener('keydown', onMainPinKeydown);


  window.pin = {
    MainPinSize: MainPinSize,
    PinSize: PinSize,
    MainPinStartCoord: MainPinStartCoord,
    onMainPinMousedown: onMainPinMousedown,
    onMainPinKeydown: onMainPinKeydown,
    clearPins: clearPins
  };
})();
