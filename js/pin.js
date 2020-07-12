'use strict';

(function () {


  // получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
  var mapPinsList = window.map.mapBlock.querySelector('.map__pins');

  // нахожу главный пин, при взаимодействии с которым происходит переход режима карты из неактивного в активный
  var mainPin = window.map.mapBlock.querySelector('.map__pin--main');


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
  mainPin.addEventListener('mousedown', onMainPinMousedown);
  mainPin.addEventListener('keydown', onMainPinKeydown);


  window.pin = {
    mainPin: mainPin,
    mapPinsList: mapPinsList
  };
})();
