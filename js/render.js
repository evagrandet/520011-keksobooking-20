'use strict';

(function () {
  var ADVERT_COUNT = 5;

  // получаю шаблон метки, добираюсь до разметки внутри
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var onPinElementClick = function (advert, evt) {
    // проверяю наличие открытых карточек и закрываю их
    window.card.closeCard();

    var activeElement = evt.currentTarget;
    var activePin = window.dom.mapBlock.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    activeElement.classList.add('map__pin--active');
    renderCard(advert);
  };

  // функция для отображения объявлений в пинах
  var createAdverts = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = advert.location.x - window.pin.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advert.location.y - window.pin.PIN_HEIGHT + 'px';
    pinImage.src = advert.author.avatar;
    pinImage.setAttribute('alt', advert.offer.title);
    pinElement.addEventListener('click', onPinElementClick.bind(null, advert));
    return pinElement;
  };


  var renderAdverts = function (data) {
    // создаю 'контейнер' будущей разметки
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > ADVERT_COUNT ? ADVERT_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createAdverts(data[i]));
    }
    // разом добавляю все пины-объявления в конец элемента, в котором должна быть разметка пинов
    window.dom.mapPinsList.appendChild(fragment);

  };


  var renderCard = function (data) {
    window.dom.mapBlock.insertBefore(window.card.createCard(data), window.dom.mapFilterContainer);
  };


  window.render = {
    renderAdverts: renderAdverts,
    renderCard: renderCard
  };

})();
