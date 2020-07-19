'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var STATUS_OK = 200;
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';

  var requestToServer = function (type, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      ('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    switch (type) {
      case 'GET':
        xhr.open('GET', LOAD_URL);
        xhr.send();
        break;
    }
  };
  window.backend = {
    requestToServer: requestToServer
  };
})();
