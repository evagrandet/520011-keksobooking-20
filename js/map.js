'use strict';

(function () {


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

  // записываю в переменную ширину элемента карты
  var mapBlockWidth = window.dom.mapBlock.offsetWidth;

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
          'title': window.utils.getRandomElement(ADVERT_TITLES),
          'address': advertLocationX + ', ' + advertLocationY,
          'price': window.utils.getRandomElement(ADVERT_PRICES),
          'type': window.utils.getRandomElement(ADVERT_TYPES),
          'rooms': window.utils.getRandomElement(ADVERT_ROOMS),
          'guests': window.utils.getRandomElement(ADVERT_GUESTS),
          'checkin': window.utils.getRandomElement(ADVERT_CHECKINS),
          'checkout': window.utils.getRandomElement(ADVERT_CHECKOUTS),
          'features': window.utils.getRandomElements(ADVERT_FEATURES),
          'description': window.utils.getRandomElement(ADVERT_DESCRIPTIONS),
          'photos': window.utils.getRandomElements(ADVERT_PHOTOS),
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
    var pinElement = window.dom.pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advert.location.y - PIN_HEIGHT + 'px';
    pinImage.src = advert.author.avatar;
    pinImage.setAttribute('alt', advert.offer.title);
    return pinElement;
  };


  // прохождусь по циклу объявлений, запускаю для каждого функцию по отображения пина, затем каждый из пинов добавляю в 'контейнер'
  for (var i = 0; i < adverts.length; i++) {
    window.dom.fragment.appendChild(renderAdverts(adverts[i]));
  }

  // функция, которая срабатывает при взаимодействии с главным пином (удаляются классы у блоков карты и формы, перевожу поля формы и фильтра в активное состояние, меняю значение адреса главной метки [смещаю его с центра на ее 'хвост'], затем выключаю поле адреса)
  var activateMap = function () {
    window.dom.mapBlock.classList.remove('map--faded');
    window.dom.adForm.classList.remove('ad-form--disabled');
    // разом добавляю все пины-объявления в конец элемента, в котором должна быть разметка пинов
    window.dom.mapPinsList.appendChild(window.dom.fragment);
    // вызываю функции включения форм и определения адреса главного пина
    window.form.enableForms();
    window.form.changeAdvertAddressInputValue();

    // обратботчик события, который сработает, если при отправке данных на сервер выяснится, что пользователь ввел цену меньше, чем необходимо при выбранном типе жилья
    window.dom.priceAdvertInput.addEventListener('invalid', window.form.onPriceAdvertInputInvalid);
    // добавляю для него обработчик события для дополнительной кастомной валидации поля
    window.dom.titleAdvertInput.addEventListener('invalid', window.form.onTitleAdvertInputInvalid);
    // добавляю еще один обработчик, чтобы повысить информативность
    window.dom.titleAdvertInput.addEventListener('input', window.form.onTitleAdvertInputInput);
    // добавляю обработчик события с функцией выше на селект выбора типа жилья
    window.dom.typeAdvertSelect.addEventListener('change', window.form.onTypeAdvertSelectChange);
    // обработчик событий для полей количества комнат
    window.dom.roomsAdvertSelect.addEventListener('change', window.form.onRoomsAdvertSelectChange);
    // добавляю обработчики событий на поля въезда-выезда
    window.dom.checkInSelect.addEventListener('change', window.form.onCheckInSelectChange);
    window.dom.checkOutSelect.addEventListener('change', window.form.onCheckOutSelectChange);
  };


  window.map = {
    activateMap: activateMap
  };

})();
