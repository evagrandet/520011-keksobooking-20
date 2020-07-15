'use strict';

(function () {

  // функция, которая будет срабатывать на нажатии левой кнопки мыши, и которая будет активировать карту
  var onMainPinMousedown = function (evt) {
    if (evt.buttons === 1) {
      window.map.activateMap();
    }
  };

  // функция, которая будет срабатывать на нажатии кнопки ENTER, и которая будет активировать карту
  var onMainPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      window.map.activateMap();
    }
  };

  // добавляю два обработчика событий на главный пин
  window.dom.mainPin.addEventListener('mousedown', onMainPinMousedown);
  window.dom.mainPin.addEventListener('keydown', onMainPinKeydown);
})();
