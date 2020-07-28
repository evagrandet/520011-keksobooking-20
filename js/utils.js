'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 1000;
  var ESC_KEY = 'Escape';

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


  // функции, которые сработают при нажатии клавиши Escape и клике при открытом попапе удачи/неуспеха (и которые вызовут другую функцию)
  var onDocumentKeydown = function (type, evt) {
    if (evt.key === ESC_KEY) {
      closeMessage(type);
    }
  };

  var onDocumentClick = function (type) {
    closeMessage(type);
  };

  // функция, которая удалит попап успеха/неудачи а так же удалит обработчики событий на них
  var closeMessage = function (type) {
    var message = window.dom.mainBlock.querySelector('.' + type);
    if (message) {
      message.remove();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    debounce: debounce,
    onDocumentKeydown: onDocumentKeydown,
    onDocumentClick: onDocumentClick,
    closeMessage: closeMessage
  };
})();
