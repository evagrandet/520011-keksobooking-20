'use strict';


(function () {
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
      container.appendChild(li);
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
    window.dom.mapBlock.removeEventListener('keydown', onCardKeydown);
  };

  // функция, которая вызовется при клике по кнопке закрытия карточки
  var onCardCloseBtnClick = function () {
    closeCard();
  };

  // функция, которая вызовется при нажатии клавиши Escape, если карточка открыта
  var onCardKeydown = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closeCard();
    }
  };

  // функция, которая проверяет, есть ли в объявлении все данные, и если нет, скрывает поле в карточке
  var checkMissingField = function (element, content) {
    if (content === undefined || content.length === 0) {
      element.classList.add('hidden');
    }
  };

  // функция создания карточки - заполнение всех полей, рендер контейнеров для изображений и списка, добавление слушателей событий
  var createCard = function (advert) {
    var card = window.dom.cardTemplate.cloneNode(true);
    var imageContainer = card.querySelector('.popup__photos');
    var featureContainer = card.querySelector('.popup__features');
    var cardCloseBtn = card.querySelector('.popup__close');

    var cardAvatar = card.querySelector('.popup__avatar');
    cardAvatar.src = advert.author.avatar;
    checkMissingField(cardAvatar, advert.author.avatar);

    var cardTitle = card.querySelector('.popup__title');
    cardTitle.textContent = advert.offer.title;
    checkMissingField(cardTitle, advert.offer.title);

    var cardAdress = card.querySelector('.popup__text--address');
    cardAdress.textContent = advert.offer.address;
    checkMissingField(cardAdress, advert.offer.address);

    var cardPrice = card.querySelector('.popup__text--price');
    cardPrice.textContent = advert.offer.price + '₽/ночь';
    checkMissingField(cardPrice, advert.offer.price);

    var cardType = card.querySelector('.popup__type');
    cardType.textContent = typeHousingMap[advert.offer.type];
    checkMissingField(cardType, advert.offer.type);

    var cardCapacity = card.querySelector('.popup__text--capacity');
    cardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    checkMissingField(cardCapacity, advert.offer.rooms);
    checkMissingField(cardCapacity, advert.offer.guests);


    var cardTime = card.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    checkMissingField(cardTime, advert.offer.checkin);
    checkMissingField(cardTime, advert.offer.checkout);

    var cardDescription = card.querySelector('.popup__description');
    cardDescription.textContent = advert.offer.description;
    checkMissingField(cardDescription, advert.offer.description);

    renderImage(imageContainer, advert.offer.photos);
    checkMissingField(imageContainer, advert.offer.photos);

    renderFeature(featureContainer, advert.offer.features);
    checkMissingField(featureContainer, advert.offer.features);

    cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
    window.dom.mapBlock.addEventListener('keydown', onCardKeydown);

    return card;
  };


  window.card = {
    create: createCard,
    close: closeCard
  };
})();
