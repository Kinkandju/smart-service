'use strict';

(function () {
  var KEY_CODE = 27;

  var buttonOpen = document.querySelector('.contacts__open-modal');
  var overlay = document.querySelector('.overlay');

  var popup = document.querySelector('.page-footer__modal');
  var buttonClose = popup.querySelector('.modal__button--close');
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

  var onEscPress = function (evt) {
    if (evt.keyCode === KEY_CODE) {
      evt.preventDefault();

      closePopup();
    }
  };

  var openPopup = function () {
    popup.classList.add('modal--show');
    overlay.classList.add('overlay--show');

    document.addEventListener('keydown', onEscPress);
  };

  var closePopup = function () {
    popup.classList.remove('modal--show');
    popup.classList.remove('modal--error');
    overlay.classList.remove('overlay--show');

    document.removeEventListener('keydown', onEscPress);
  };

  buttonOpen.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!nameInput.value) {
      nameInput.focus();
    } else if (nameInput.value && !telInput.value) {
      telInput.focus();
    } else if (nameInput.value && telInput.value && !messageInput.value) {
      messageInput.focus();
    } else {
      localStorage.setItem('nameInput', nameInput.value);
      localStorage.setItem('telInput', telInput.value);
      localStorage.setItem('messageInput', messageInput.value);
    }

    openPopup();
  });

  buttonClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    closePopup();
  });

  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();

    closePopup();
  });

  form.addEventListener('submit', function (evt) {
    if (!nameInput.value || !telInput.value || !messageInput.value) {
      evt.preventDefault();
      popup.classList.remove('modal--error');
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add('modal--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('nameInput', nameInput.value);
        localStorage.setItem('telInput', telInput.value);
        localStorage.setItem('messageInput', messageInput.value);
      }
    }
  });

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
    button.classList.remove('info__navigation-button--closed');
    button.classList.add('info__navigation-button--opened');
  };

  var openList = function (navigation, button) {
    navigation.classList.remove('info__navigation-data--closed');
    button.classList.remove('info__navigation-button--opened');
    button.classList.add('info__navigation-button--closed');
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
            if (button.classList.contains('info__navigation-button--closed')) {
              closeList(ancestor, button);
            } else if (button.classList.contains('info__navigation-button--opened')) {
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
