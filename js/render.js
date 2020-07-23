'use strict';

(function () {
  var ADVERT_COUNT = 8;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // получаю шаблон метки, добираюсь до разметки внутри
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // функция для отображения объявлений в пинах
  var renderAdverts = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advert.location.y - PIN_HEIGHT + 'px';
    pinImage.src = advert.author.avatar;
    pinImage.setAttribute('alt', advert.offer.title);
    return pinElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > ADVERT_COUNT ? ADVERT_COUNT : data.length;

    // создаю 'контейнер' будущей разметки всех пинов-объявлений
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderAdverts(data[i]));
    }
    // разом добавляю все пины-объявления в конец элемента, в котором должна быть разметка пинов

    window.dom.mapPinsList.appendChild(fragment);
  };
  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  }
})();
