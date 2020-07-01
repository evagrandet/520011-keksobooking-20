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
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TAIL = 22;
var MAX_Y_COORDINATE = 630;
var MIN_Y_COORDINATE = 130;

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

// получаю элемент карты из DOM, записываю его в переменную
var mapBlock = document.querySelector('.map');

// записываю в переменную ширину элемента карты
var mapBlockWidth = mapBlock.offsetWidth;

// получаю элемент, внутри которого будут располагаться все метки на карте, записываю его в переменную
var mapPinsList = mapBlock.querySelector('.map__pins');

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


// нахожу форму и все ее элементы
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.children;

// нахожу все дочерние элементы у блока с фильтрами карты
var mapFilters = mapBlock.querySelector('.map__filters').children;

// нахожу главный пин, при взаимодействии с которым происходит переход режима карты из неактивного в активный
var mainPin = mapBlock.querySelector('.map__pin--main');


// нахожу поле адреса и сразу туда вписываю значение центра главного пина
var advertAddressInput = adForm.querySelector('#address');
advertAddressInput.value = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);

// при загрузке страницы сразу прохожусь по всем полям форм/фильтров и перевожу их в нактивное состояние
window.onload = function () {
  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].disabled = true;
  }
  for (var k = 0; k < mapFilters.length; k++) {
    mapFilters[k].disabled = true;
  }
};

// выношу в переменные поля заголовка, цены и типа жилья
var titleAdvertInput = adForm.querySelector('#title');
var typeAdvertSelect = adForm.querySelector('#type');
var priceAdvertInput = adForm.querySelector('#price');

// структура данных для выражения типа и минимальной цены жилья
var priceTypeToRange = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

// функция, которая будет менять в поле цены плейсхолдер и минимальное значение в зависимости от выбранного типа жилья
var onTypeAdvertSelectChange = function (evt) {
  priceAdvertInput.placeholder = priceTypeToRange[evt.target.value];
  priceAdvertInput.min = priceTypeToRange[evt.target.value];
};


// переменные для полей количества комнат и вместимости
var roomsAdvertSelect = adForm.querySelector('#room_number');
var guestsAdvertSelect = adForm.querySelector('#capacity');

// функция, которая дизейблит варианты количества гостей, если они не соотвествуют условию
var onRoomsAdvertSelectChange = function (evt) {
  var guestsOptions = guestsAdvertSelect.children;
  for (var m = 0; m < guestsOptions.length; m++) {
    if (evt.target.value === '100' && guestsOptions[m].value !== '0') {
      guestsOptions[m].disabled = true;
    } else if (evt.target.value < guestsOptions[m].value && guestsOptions[m].value !== '0') {
      guestsOptions[m].disabled = true;
    } else if (evt.target.value !== '100' && guestsOptions[m].value === '0') {
      guestsOptions[m].disabled = true;
    } else {
      guestsOptions[m].disabled = false;
    }
  }
};

// функция, которая будет дизейблить комнаты в зависимости от выбранного количества комнат (если вдруг пользователь начнет сначала выбирать количество гостей)
var onGuestsAdvertSelectChange = function (evt) {
  var roomsOptions = roomsAdvertSelect.children;
  for (var n = 0; n < roomsOptions.length; n++) {
    if (+evt.target.value === 0 && +roomsOptions[n].value !== 100) {
      roomsOptions[n].disabled = true;
    } else if (evt.target.value < roomsOptions[n].value && +roomsOptions[n].value !== 100) {
      roomsOptions[n].disabled = true;
    } else if (+evt.target.value !== 0 && +roomsOptions[n].value === 100) {
      roomsOptions[n].disabled = true;
    } else {
      roomsOptions[n].disabled = false;
    }
  }
};


// выношу в переменные поля въезда и выезда в/из жилья
var checkInSelect = adForm.querySelector('#timein');
var checkOutSelect = adForm.querySelector('#timeout');

// функция для поля въезда
var onCheckInSelectChange = function (evt) {
  synchronizeTime(evt, checkOutSelect);
};

// функция для поля выезда
var onCheckOutSelectChange = function (evt) {
  synchronizeTime(evt, checkInSelect);
};

// функция, которая синхронизирует поля въезда-выезда между собой
var synchronizeTime = function (evt, element) {
  element.value = evt.target.value;
};

// функция обработки события невалидности поля цены
var onPriceAdvertInputInvalid = function () {
  if (priceAdvertInput.validity.rangeUnderflow) {
    priceAdvertInput.setCustomValidity('Выбранная Вами цена меньше минимально допустимой цены в ' + priceAdvertInput.min + ' рублей');
  } else {
    priceAdvertInput.setCustomValidity('');
  }
};

// функция обработки события невалидности поля заголовка
var onTitleAdvertInputInvalid = function () {
  if (titleAdvertInput.validity.tooShort) {
    titleAdvertInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (titleAdvertInput.validity.tooLong) {
    titleAdvertInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (titleAdvertInput.validity.valueMissing) {
    titleAdvertInput.setCustomValidity('Обязательное поле');
  } else {
    titleAdvertInput.setCustomValidity('');
  }
};

// функция обработки события ввода заголовка
var onTitleAdvertInputInput = function () {
  var valueLength = titleAdvertInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleAdvertInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAdvertInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleAdvertInput.setCustomValidity('');
  }
};

// функция включения форм
var enableForms = function () {
  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].disabled = false;
  }
  for (var k = 0; k < mapFilters.length; k++) {
    mapFilters[k].disabled = false;
  }
};

// функция высчитывает координаты пина главного, подставляет их в input и отключает его
var changeAdvertAddressInputValue = function () {
  advertAddressInput.value = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL);
  advertAddressInput.disabled = true;
};

// функция, которая срабатывает при взаимодействии с главным пином (удаляются классы у блоков карты и формы, перевожу поля формы и фильтра в активное состояние, меняю значение адреса главной метки [смещаю его с центра на ее 'хвост'], затем выключаю поле адреса)
var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  // разом добавляю все пины-объявления в конец элемента, в котором должна быть разметка пинов
  mapPinsList.appendChild(fragment);
  // вызываю функции включения форм и определения адреса главного пина
  enableForms();
  changeAdvertAddressInputValue();

  // обратботчик события, который сработает, если при отправке данных на сервер выяснится, что пользователь ввел цену меньше, чем необходимо при выбранном типе жилья
  priceAdvertInput.addEventListener('invalid', onPriceAdvertInputInvalid);
  // добавляю для него обработчик события для дополнительной кастомной валидации поля
  titleAdvertInput.addEventListener('invalid', onTitleAdvertInputInvalid);
  // добавляю еще один обработчик, чтобы повысить информативность
  titleAdvertInput.addEventListener('input', onTitleAdvertInputInput);
  // добавляю обработчик события с функцией выше на селект выбора типа жилья
  typeAdvertSelect.addEventListener('change', onTypeAdvertSelectChange);
  // обработчик событий для полей количества комнат
  roomsAdvertSelect.addEventListener('change', onRoomsAdvertSelectChange);
  guestsAdvertSelect.addEventListener('change', onGuestsAdvertSelectChange);
  // добавляю обработчики событий на поля въезда-выезда
  checkInSelect.addEventListener('change', onCheckInSelectChange);
  checkOutSelect.addEventListener('change', onCheckOutSelectChange);
};

// функция, которая будет срабатывать на нажатии левой кнопки мыши, и которая будет активировать карту
var onMainPinMousedown = function (evt) {
  if (evt.buttons === 1) {
    activateMap();
  }
};

// функция, которая будет срабатывать на нажатии кнопки ENTER, и которая будет активировать карту
var onMainPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
  }
};

// добавляю два обработчика событий на главный пин
mainPin.addEventListener('mousedown', onMainPinMousedown);
mainPin.addEventListener('keydown', onMainPinKeydown);


var onSubmitAdForm = function () {
  // удаление всех обработчиков событий
  priceAdvertInput.removeEventListener('invalid', onPriceAdvertInputInvalid);
  titleAdvertInput.removeEventListener('invalid', onTitleAdvertInputInvalid);
  titleAdvertInput.removeEventListener('input', onTitleAdvertInputInput);
  typeAdvertSelect.removeEventListener('change', onTypeAdvertSelectChange);
  roomsAdvertSelect.removeEventListener('change', onRoomsAdvertSelectChange);
  guestsAdvertSelect.removeEventListener('change', onGuestsAdvertSelectChange);
  checkInSelect.removeEventListener('change', onCheckInSelectChange);
  checkOutSelect.removeEventListener('change', onCheckOutSelectChange);
};
adForm.addEventListener('submit', onSubmitAdForm);
