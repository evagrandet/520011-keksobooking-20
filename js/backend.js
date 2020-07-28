'use strict';

(function () {
  var MESSAGE_ANSWER_STATUS = 'Статус ответа:';
  var MESSAGE_ERROR_CONNECTION = 'Произошла ошибка соединения';
  var MESSAGE_REQUEST_TIME = 'Запрос не успел выполниться за';
  var MESSAGE_MILLISECONDS = 'мс';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_OK = 200;
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';

  var requestToServer = function (type, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(MESSAGE_ANSWER_STATUS + ' ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(MESSAGE_ERROR_CONNECTION);
    });
    xhr.addEventListener('timeout', function () {
      onError(MESSAGE_REQUEST_TIME + ' ' + xhr.timeout + MESSAGE_MILLISECONDS);
    });
    xhr.timeout = TIMEOUT_IN_MS;

    switch (type) {
      case 'GET':
        xhr.open('GET', LOAD_URL);
        xhr.send();
        break;
      case 'POST':
        xhr.open('POST', SAVE_URL);
        xhr.send(data);
        break;
    }
  };
  window.backend = {
    requestToServer: requestToServer
  };
})();
