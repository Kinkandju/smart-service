'use strict';

// var inputsTel = document.querySelectorAll('input[type="tel"]');
// var maskTel = new Inputmask('+7 (999) 999-99-99');
// maskTel.mask(inputsTel);

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


// var navButton = document.querySelector('.navigation__button');
// var locationButton = document.querySelector('.location__button');
// var navList = document.querySelector('.navigation__list');
// var locationGroup = document.querySelector('.location__group');
//
// navList.classList.remove('navigation__list--nojs');
// locationGroup.classList.remove('location__group--nojs');
