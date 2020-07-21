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
  window.dom.mapPinElements.addEventListener('click', function (evt) {
      var container = document.querySelector('.map');
      var activeElement = evt.currentTarget;
      var activePin = window.map.container.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      activeElement.classList.add('map__pin--active');
      window.card.render(container, window.card.createCard(card));
    });

    return pin;
})();
