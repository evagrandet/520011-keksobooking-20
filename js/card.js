'use strict';


(function () {
  var ESC_KEY = 'Escape';

  var typeHousingMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // функция рендера изображения жилья в карточке
  var renderImage = function (container, photos) {
    container.innerHTML = '';
    photos.forEach(function (photo) {
      var img = document.createElement('img');

      img.src = photo;
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      container.appendChild(img);
    });
  };

  // функция рендера списка особеностей жилья в карточке
  var renderFeature = function (container, features) {
    container.innerHTML = '';
    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.textContent = feature;
      li.className = 'popup__feature popup__feature--' + feature;
    });
  };

  // функция закрытия карточки (она же снимает класс активного пина)
  var closeCard = function () {
    var card = window.dom.mapBlock.querySelector('.popup');
    var activePin = window.dom.mapBlock.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    if (card) {
      card.remove();
    }
  };

  // функция, которая вызовется при клике по кнопке закрытия карточки
  var onCardCloseBtnClick = function () {
    closeCard();
  };

  // функция, которая вызовется при нажатии клавиши Escape, если карточка открыта
  var onCardKeydown = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  };

  // функция создания карточки - заполнение всех полей, рендер контейнеров для изображений и списка, добавление слушателей событий
  var createCard = function (advert) {
    var card = window.dom.cardTemplate.cloneNode(true);
    var imageContainer = card.querySelector('.popup__photos');
    var featureContainer = card.querySelector('.popup__features');
    var cardCloseBtn = card.querySelector('.popup__close');

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeHousingMap[advert.offer.type];
    card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;

    renderImage(imageContainer, advert.offer.photos);
    renderFeature(featureContainer, advert.offer.features);

    cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
    card.addEventListener('keydown', onCardKeydown);
    return card;
  };


  window.card = {
    createCard: createCard,
    closeCard: closeCard
  };
})();
