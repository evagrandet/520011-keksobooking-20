'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_TAIL = 25;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ENTER_KEY = 'Enter';

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
      window.dnd.dragAndDropMainPin(evt);
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
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_TAIL: MAIN_PIN_TAIL,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    onMainPinMousedown: onMainPinMousedown,
    onMainPinKeydown: onMainPinKeydown,
    clearPins: clearPins
  };
})();
