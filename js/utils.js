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

  // функция отображения сообщения об ошибке
  var renderError = function (errorMessage) {
    var error = document.createElement('div');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    error.style.position = 'absolute';
    error.style.left = '0';
    error.style.right = '0';
    error.style.fontSize = '30px';

    error.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', error);
  };


  window.utils = {
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    renderError: renderError
  };
})();
