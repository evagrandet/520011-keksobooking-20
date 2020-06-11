'use strict';

// константы
var ADVERT_COUNT = 8;
var ADVERT_TITLES = ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'];
var ADVERT_PRICES = ['100', '200', '300', '400', '500', '600', '700', '800'];
var ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERT_ROOMS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var ADVERT_GUESTS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var ADVERT_CHECKINS = ['12:00', '13:00', '14:00'];
var ADVERT_CHECKOUTS = ['12:00', '13:00', '14:00'];
var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADVERT_DESCRIPTIONS = ['описание1', 'описание2', 'описание3', 'описание4', 'описание5', 'описание6', 'описание7', 'описание8'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAX_Y_COORDINATE = 630;
var MIN_Y_COORDINATE = 130;


// получаю элемент карты из DOM, записываю его в переменную, удаляю у него класс
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// записываю в переменную ширину элемента карты
var mapBlockWidth = mapBlock.offsetWidth;

// получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
var mapPinsList = document.querySelector('.map__pins');

// получаю шаблон метки, добираюсь до разметки внутри
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция для получения случайного элемента из массива
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

// функция для создания массива случайной длины без повторов в элементах
var getRandomElements = function (elements) {
  var randomElements = [];
  var i = 0;
  while (i <= Math.floor(Math.random() * elements.length)) {
    var element = elements[Math.floor(Math.random() * elements.length)];
    if (randomElements.indexOf(element) === -1) {
      randomElements.push(element);
      i++;
    }
  }
  return randomElements;
};

// функция, в которой создается массив, внутри цикла в каждой итерации создается объявление и затем пушится в массив
var getRandomAdvertsList = function () {
  var adverts = [];
  for (var i = 0; i < ADVERT_COUNT; i++) {
    var advertLocationX = Math.floor(Math.random() * (mapBlockWidth + 1));
    var advertLocationY = Math.floor(MIN_Y_COORDINATE + Math.random() * (MAX_Y_COORDINATE + 1 - MIN_Y_COORDINATE)) + PIN_HEIGHT;
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': getRandomElement(ADVERT_TITLES),
        'address': advertLocationX + ', ' + advertLocationY,
        'price': getRandomElement(ADVERT_PRICES),
        'type': getRandomElement(ADVERT_TYPES),
        'rooms': getRandomElement(ADVERT_ROOMS),
        'guests': getRandomElement(ADVERT_GUESTS),
        'checkin': getRandomElement(ADVERT_CHECKINS),
        'checkout': getRandomElement(ADVERT_CHECKOUTS),
        'features': getRandomElements(ADVERT_FEATURES),
        'description': getRandomElement(ADVERT_DESCRIPTIONS),
        'photos': getRandomElements(ADVERT_PHOTOS),
      },
      'location': {
        'x': advertLocationX,
        'y': advertLocationY
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

// записываю результат выполнения функции в переменную
var adverts = getRandomAdvertsList();

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

// создаю 'контейнер' будущей разметки всех пинов-объявлений
var fragment = document.createDocumentFragment();

// прохождусь по циклу объявлений, запускаю для каждого функцию по отображения пина, затем каждый из пинов добавляю в 'контейнер'
for (var i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderAdverts(adverts[i]));
}

// разом добавляю все пины-объявления в конец элемента, в котором должна быть разметка пинов
mapPinsList.appendChild(fragment);
