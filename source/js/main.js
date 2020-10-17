'use strict';

(function () {

  var PHONE_INPUTS = ['tel', 'user_tel'];

  PHONE_INPUTS.forEach(function (input) {
    IMask(document.getElementById(input), {
      mask: '+{7} (000) 000-00-00'
    });
  });

  var ESC = 27;

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

  var closeList = function (navigation, button) {
    navigation.classList.add('info__navigation-data--closed');
    button.classList.remove('info__navigation-button--opened');
    button.classList.add('info__navigation-button--closed');
  };

  var openList = function (navigation, button) {
    navigation.classList.remove('info__navigation-data--closed');
    button.classList.remove('info__navigation-button--closed');
    button.classList.add('info__navigation-button--opened');
  };

  var accordionLists = document.querySelectorAll('.info__navigation-data, .info__location');

  var accordion = function (list, status) {
    for (var j = 0; j < list.length; j++) {
      var container = list[j];

      if (status === 'initial') {
        var toggle = container.querySelector('.info__navigation-container');
        toggle.addEventListener('click', function (evt) {
          evt.preventDefault();

          var button = evt.target;
          var ancestor = evt.currentTarget.parentNode;

          if (button.classList.contains('info__navigation-button')) {
            if (button.classList.contains('info__navigation-button--opened')) {
              closeList(ancestor, button);
            } else if (button.classList.contains('info__navigation-button--closed')) {
              accordion(accordionLists, 'closeall');
              openList(ancestor, button);
            }
          }
        });
      }
      if (status === 'closeall') {
        closeList(container, container.querySelector('.info__navigation-button'));
      }
    }
  };

  accordion(accordionLists, 'initial');

})();
