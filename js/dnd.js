'use strict';

(function () {


  var startDrag = function (evt) {
    evt.preventDefault();

    var limits = {
      top: window.map.MAP_TOP_Y + window.pin.PIN_HEIGHT,
      bottom: window.map.MAP_BOTTOM_Y - window.pin.PIN_HEIGHT,
      right: 0,
      left: 0
    }

    // стартовые координаты, с которых началось перетаскивание
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // переменная-флаг для понимания того, собирается пользователь поменять аватар или двигать попап
    window.dnd.isDragged = false;

    // функция, которая будет отрабатывать при движении мыши
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // подтверждение, что пользователь собирается двигать попап
      isDragged = true;

      // координаты смещения
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // обновляем стартовые координаты с тех, которые были при клике мыши на те, которые стали при движении мыши
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // задаем попапу координаты (вычитаем из расстояния между попапом и его родителем[body] координаты смещения)
      window.dom.mainPin.style.top = (window.dom.mainPin.offsetTop - shift.y) + 'px';
      window.dom.mainPin.style.left = (window.dom.mainPin.offsetLeft - shift.x) + 'px';
    };
    // функция, которая будет срабатывать при отпускании клавиши мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // удаляем все обработчики
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // если пользователь двигает попап, то нужно отменить действие на клик мыши по умолчанию
      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.dom.mainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.dom.mainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    // добавляем обработчики событий на опускание кнопки мыши и передвижение мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.dnd = {
    startDrag: startDrag
  };
})();
