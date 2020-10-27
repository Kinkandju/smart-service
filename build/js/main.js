'use strict';

(function () {

  var ESC = 27;
  var DEVICE_SIZE = 768;
  var DESKTOP_WIDTH = 1024;
  var TABLET_WIDTH = 768;

  var maskedInputs = document.querySelectorAll('input[data-inputmask]');

  var applyMask = function () {
    Array.prototype.forEach.call(maskedInputs, function (input) {
      var maskOption = {
        mask: input.getAttribute('data-inputmask')
      };
      IMask(input, maskOption);
    });
  };

  applyMask();

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

  var windowInnerWidth = document.documentElement.clientWidth;
  var infoContainer = document.querySelector('.info__container');
  var infoSocial = document.querySelector('.info__social');
  var copyrightContainer = document.querySelector('.copyright__container');
  var copyrightLink = document.querySelector('.copyright__link--first');
  var copyrightText = document.querySelector('.copyright__text--middle');

  // function addElement() {
  //   if (windowInnerWidth < DESKTOP_WIDTH) {
  //     infoContainer.insertBefore(copyrightText, infoSocial);
  //     copyrightText.style.margin = 0;
  //     copyrightText.style.right = 0;
  //   } else if (windowInnerWidth < TABLET_WIDTH) {
  //     copyrightText.style.margin = 0;
  //     copyrightText.style.marginBottom = 32 + 'px';
  //     copyrightText.style.right = 0;
  //   } else {
  //     copyrightContainer.insertBefore(copyrightText, copyrightLink);
  //     copyrightText.style.marginRight = 50 + 'px';
  //     copyrightText.style.right = 35 + 'px';
  //   }
  // }

  function addElementTablet() {
    infoContainer.insertBefore(copyrightText, infoSocial);
    copyrightText.style.margin = 0;
    copyrightText.style.right = 0;
  }

  function addElementMobil() {
    infoContainer.insertBefore(copyrightText, infoSocial);
    copyrightText.style.margin = 0;
    copyrightText.style.marginBottom = 32 + 'px';
    copyrightText.style.right = 0;
  }

  function addElementDesktop() {
    copyrightContainer.insertBefore(copyrightText, copyrightLink);
    copyrightText.style.marginRight = 50 + 'px';
    copyrightText.style.right = 35 + 'px';
  }


  window.addEventListener('resize', function (evt) {
    evt.preventDefault();

    if (windowInnerWidth < DESKTOP_WIDTH) {
      addElementTablet();
    } else if (windowInnerWidth < TABLET_WIDTH) {
      addElementMobil();
    } else {
      addElementDesktop();
    }
  });

  function classListAdd(element, className) {
    element.classList.add(className);
  }

  function classListRemove(element, className) {
    element.classList.remove(className);
  }

  function removeClassJs(toggle) {
    for (var j = 0; j < toggles.length; j++) {
      toggle[j].classList.remove('navigation__toggle--nojs');
    }
  }

  var toggles = document.querySelectorAll('.navigation__toggle');

  function isToggleActive() {
    removeClassJs(toggles);

    toggles.forEach(function (element) {
      classListAdd(element, 'navigation__toggle--active');
      window.addEventListener('resize', function () {
        var action = innerWidth < DEVICE_SIZE ? classListAdd : classListRemove;
        action(element, 'navigation__toggle--active');
      });

      element.addEventListener('click', function () {
        if (innerWidth < DEVICE_SIZE) {
          var action = classListAdd;
          if (element.classList.contains('navigation__toggle--active')) {
            for (var j = 0; j < toggles.length; j++) {
              classListAdd(toggles[j], 'navigation__toggle--active');
            }
            action = classListRemove;
          }
          action(element, 'navigation__toggle--active');
        }
      });
    });
  }

  isToggleActive(toggles);

})();
