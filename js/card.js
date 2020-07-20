'use strict';


(function () {
  var typeHousingMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

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

  var renderFeature = function (container, features) {
    container.innerHTML = '';
    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.textContent = feature;
      li.className = 'popup__feature popup__feature--' + feature;
    });
  };

  var createCard = function () {
    var card = window.dom.cardTemplate.cloneNode(true);
    var imageContainer = card.querySelector('.popup__photos');
    var featureContainer = card.querySelector('.popup__features');

    card.querySelector('.popup__avatar').src = card.author.avatar;
    card.querySelector('.popup__title').textContent = card.offer.title;
    card.querySelector('.popup__text--address').textContent = card.offer.address;
    card.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeHousingMap[card.offer.type];
    card.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    card.querySelector('.popup__description').textContent = card.offer.description;

    renderImage(imageContainer, card.offer.photos);
    renderFeature(featureContainer, card.offer.features);
  };
  window.card = {
    createCard: createCard
  };
})();
