'use strict';

(function () {

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

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements
  };
})();
