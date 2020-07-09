'use strict';

(function () {


// получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
var mapPinsList = mapBlock.querySelector('.map__pins');

// получаю шаблон метки, добираюсь до разметки внутри
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

})();
