'use strict';

(function () {

  var ESC = 27;
  var DEVICE_SIZE = 768;

  var formTel = document.querySelector('#tel');
  var modalTel = document.querySelector('#user_tel');

  function validateTel(tel) {
    var telInputMask = new Inputmask('+7 (999) 999-99-99');
    telInputMask.mask(tel);
  }

  validateTel(formTel);
  validateTel(modalTel);

  var popup = document.querySelector('.modal');
  var form = popup.querySelector('.modal__form');
  var nameInput = document.getElementById('user_name');
  var telInput = document.getElementById('user_tel');
  var messageInput = document.getElementById('user_message');

  var isStorageSupport = true;
  var storageName = '';
  var storageTel = '';
  var storageMessage = '';

  try {
    storageName = localStorage.getItem('nameInput');
    storageTel = localStorage.getItem('telInput');
    storageMessage = localStorage.getItem('messageInput');
  } catch (err) {
    isStorageSupport = false;
  }

  if (isStorageSupport) {
    if (storageName) {
      nameInput.value = storageName;
    }
    if (storageTel) {
      telInput.value = storageTel;
    }
    if (storageMessage) {
      messageInput.innerText = storageMessage;
    }
  }

  function openPopup() {
    var buttonOpen = document.querySelector('.contacts__open-modal');

    if (buttonOpen) {
      buttonOpen.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (popup) {
          document.body.classList.add('modal--active');
          nameInput.focus();

          localStorage.setItem('nameInput', nameInput.value);
          localStorage.setItem('telInput', telInput.value);
          localStorage.setItem('messageInput', messageInput.value);
        }
      });
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        document.body.classList.remove('modal--active');
      }
    });
  }

  function closePopup() {
    var buttonClose = popup.querySelector('.modal__button-close');

    if (buttonClose) {
      buttonClose.addEventListener('click', function () {
        document.body.classList.remove('modal--active');
      });
    }

    if (popup) {
      popup.addEventListener('click', function (evt) {
        if (evt.target.closest('.modal__container') === null) {
          document.body.classList.remove('modal--active');
        }
      });
    }
  }

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('nameInput', nameInput.value);
      localStorage.setItem('telInput', telInput.value);
      localStorage.setItem('messageInput', messageInput.value);
    }
  });

  openPopup();
  closePopup();

  function getScroll() {
    var linkAnchors = document.querySelectorAll('.promo__link, .promo__scroll-down');

    for (var i = 0; i < linkAnchors.length; i++) {
      linkAnchors[i].addEventListener('click', function (evt) {
        evt.preventDefault();

        var targetElement = document.querySelector(evt.currentTarget.href.replace(/[^#]*(.*)/, '$1'));
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        function isInternetExplorer() {
          return msie > -1 || trident > -1;
        }

        var targetY;

        if (isInternetExplorer() === false) {
          targetY = targetElement.getBoundingClientRect().y;
        } else {
          targetY = targetElement.getBoundingClientRect().top;
        }

        var startY = window.pageYOffset;
        var data = {
          duration: 1800,
          timing: function (timeFraction) {
            return timeFraction;
          },
          draw: function (progress) {
            window.scrollTo(0, startY + progress * targetY);
          }
        };

        function getScrollSpeed(object) {
          var start = performance.now();

          requestAnimationFrame(function animate(time) {
            var timePart = (time - start) / object.duration;

            if (timePart > 1) {
              timePart = 1;
            }

            var progress = object.timing(timePart);
            object.draw(progress);

            if (timePart < 1) {
              requestAnimationFrame(animate);
            }
          });
        }

        getScrollSpeed(data);
      });
    }
  }

  getScroll();

  function classListAdd(element, className) {
    element.classList.add(className);
  }

  function classListRemove(element, className) {
    element.classList.remove(className);
  }

  var toggles = document.querySelectorAll('.navigation__title');

  function isToggleActive() {

    function removeClassJs(toggle) {
      for (var j = 0; j < toggles.length; j++) {
        toggle[j].classList.remove('navigation__title--nojs');
      }
    }

    removeClassJs(toggles);

    toggles.forEach(function (element) {
      classListAdd(element, 'navigation__title--active');
      window.addEventListener('resize', function () {
        var action = innerWidth < DEVICE_SIZE ? classListAdd : classListRemove;
        action(element, 'navigation__title--active');
      });

      element.addEventListener('click', function () {
        if (innerWidth < DEVICE_SIZE) {
          var action = classListAdd;
          if (element.classList.contains('navigation__title--active')) {
            for (var j = 0; j < toggles.length; j++) {
              classListAdd(toggles[j], 'navigation__title--active');
            }
            action = classListRemove;
          }
          action(element, 'navigation__title--active');
        }
      });
    });
  }

  isToggleActive(toggles);

})();
