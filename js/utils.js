'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEY = 'Escape';

  // функции, которые сработают при нажатии клавиши Escape и клике при открытом попапе удачи/неуспеха (и которые вызовут другую функцию)
  var onDocumentKeydown = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage(evt.target.className);
    }
  };

  var onDocumentClick = function (evt) {
    closeMessage(evt.target.className);
  };

  // функция, которая удалит попап успеха/неудачи а так же удалит обработчики событий на них
  var closeMessage = function (className) {
    var message = window.dom.mainBlock.querySelector('.' + className);
    if (message) {
      message.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    }
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

  var setAttribute = function (element, attribute, data) {
    element[attribute] = data;
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    debounce: debounce,
    onDocumentKeydown: onDocumentKeydown,
    onDocumentClick: onDocumentClick,
    closeMessage: closeMessage,
    setAttribute: setAttribute
  };
})();
