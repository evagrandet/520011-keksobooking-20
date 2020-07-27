'use strict';

(function () {


  var dragAndDropMainPin = function (evt) {
    evt.preventDefault();

    // определяю пределы сдвига пина
    var limits = {
      top: window.map.MapCoord.topY - (window.pin.MainPinSize.height + window.pin.MAIN_PIN_TAIL),
      bottom: window.map.MapCoord.bottomY - (window.pin.MainPinSize.height + window.pin.MAIN_PIN_TAIL),
      right: window.map.MapCoord.rightX - Math.floor(window.pin.PinSize.width / 2),
      left: window.map.MapCoord.leftX - Math.floor(window.pin.PinSize.width / 2),
    };

    // стартовые координаты, с которых началось перетаскивание
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // переменная-флаг для понимания того, собирается ли пользователь передвигать пин
    window.dragAndDrop.isDragged = false;

    // функция, которая будет отрабатывать при движении мыши
    var onMapBlockMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // подтверждение, что пользователь собирается двигать пин
      window.dragAndDrop.isDragged = true;

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

      // высчитываем конечные координаты
      var endCoords = {
        x: window.dom.mainPin.offsetLeft - shift.x,
        y: window.dom.mainPin.offsetTop - shift.y
      };

      // сравниваем конечные координаты с пределами передвижения, если они выходят за рамки, то уравниваем их с пределами
      if (endCoords.x > limits.right) {
        endCoords.x = limits.right;
      } else if (endCoords.x < limits.left) {
        endCoords.x = limits.left;
      }

      if (endCoords.y < limits.top) {
        endCoords.y = limits.top;
      } else if (endCoords.y > limits.bottom) {
        endCoords.y = limits.bottom;
      }

      // задаем пину координаты
      window.dom.mainPin.style.top = endCoords.y + 'px';
      window.dom.mainPin.style.left = endCoords.x + 'px';
      // передаем координаты в поле адреса
      window.form.changeAdvertAddressInputValue(endCoords.x, endCoords.y);
    };
    // функция, которая будет срабатывать при отпускании клавиши мыши
    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // удаляем все обработчики
      window.dom.mapBlock.removeEventListener('mousemove', onMapBlockMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);

      // если пользователь двигает пин, то нужно отменить действие на клик мыши по умолчанию
      if (window.dragAndDrop.isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.dom.mainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.dom.mainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    // добавляем обработчики событий на опускание кнопки мыши и передвижение мыши
    window.dom.mapBlock.addEventListener('mousemove', onMapBlockMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };
  window.dragAndDrop = {
    dragAndDropMainPin: dragAndDropMainPin
  };
})();
