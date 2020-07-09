'use strict';

(function () {

  // нахожу форму и все ее элементы
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.children;
  // выношу в переменные поля заголовка, цены и типа жилья
  var titleAdvertInput = adForm.querySelector('#title');
  var typeAdvertSelect = adForm.querySelector('#type');
  var priceAdvertInput = adForm.querySelector('#price');
  // выношу в переменные поля въезда и выезда в/из жилья
  var checkInSelect = adForm.querySelector('#timein');
  var checkOutSelect = adForm.querySelector('#timeout');



  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets
  }
})();
