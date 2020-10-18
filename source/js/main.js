'use strict';

(function () {

  var PHONE_INPUTS = ['tel', 'user_tel'];
  var ESC = 27;
  var DEVICE_SIZE = 768;

  PHONE_INPUTS.forEach(function (input) {
    IMask(document.getElementById(input), {
      mask: '+{7} (000) 000-00-00'
    });
  });

  var classListAdd = function (element, className) {
    element.classList.add(className);
  };

  var classListRemove = function (element, className) {
    element.classList.remove(className);
  };

  var isToggleActive = function (title) {
    var titles = Array.from(document.querySelectorAll(title));

    titles.forEach(function (element) {
      classListAdd(element, 'navigation__title--active');
      window.addEventListener('resize', function () {
        var action = innerWidth < DEVICE_SIZE ? classListAdd : classListRemove;
        action(element, 'navigation__title--active');
      });

      element.addEventListener('click', function () {
        if (innerWidth < DEVICE_SIZE) {
          var action = classListAdd;
          if (element.classList.contains('navigation__title--active')) {
            titles.forEach(function (elem) {
              classListAdd(elem, 'navigation__title--active');
            });
            action = classListRemove;
          }
          action(element, 'navigation__title--active');
        }
      });
    });
  };

  isToggleActive('.navigation__title');

  var popup = document.querySelector('.modal');
  var form = popup.querySelector('.modal__form');
  var nameInput = popup.querySelector('.modal__name--input');
  var telInput = popup.querySelector('.modal__tel--input');
  var messageInput = popup.querySelector('.modal__question--input');

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

  var openPopup = function () {
    var buttonOpen = document.querySelector('.contacts__open-modal');

    if (buttonOpen) {
      buttonOpen.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (popup) {
          document.body.classList.add('modal--active');

          var username = document.querySelector('.modal__name--input');
          username.focus();

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
  };

  var closePopup = function () {
    var buttonClose = popup.querySelector('.modal__button--close');

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
  };

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('nameInput', nameInput.value);
      localStorage.setItem('telInput', telInput.value);
      localStorage.setItem('messageInput', messageInput.value);
    }
  });

  openPopup();
  closePopup();

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

      var data = {
        duration: 1800,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          window.scrollTo(0, startY + progress * targetY);
        }
      };

      getScrollSpeed(data);
    });
  }

})();
