'use strict';

var navButton = document.querySelector('.navigation__button');
var locationButton = document.querySelector('.location__button');
var navList = document.querySelector('.navigation__list');
var locationGroup = document.querySelector('.location__group');

navList.classList.remove('navigation__list--nojs');
locationGroup.classList.remove('location__group--nojs');

navButton.addEventListener('click', function () {
  if (navList.classList.contains('navigation__list--closed') || locationGroup.classList.contains('location__group--opened')) {
    navList.classList.remove('navigation__list--closed');
    navList.classList.add('navigation__list--opened');
    locationGroup.classList.remove('location__group--opened');
    locationGroup.classList.add('location__group--closed');
    navButton.classList.remove('navigation__button--closed');
    navButton.classList.add('navigation__button--opened');
    locationButton.classList.remove('location__button--closed');
    locationButton.classList.add('location__button--opened');
  } else {
    navList.classList.add('navigation__list--closed');
    navList.classList.remove('navigation__list--opened');
    navButton.classList.add('navigation__button--closed');
    navButton.classList.remove('navigation__button--opened');
  }
});

locationButton.addEventListener('click', function () {
  if (locationGroup.classList.contains('location__group--closed') || navList.classList.contains('navigation__list--opened')) {
    locationGroup.classList.remove('location__group--closed');
    locationGroup.classList.add('location__group--opened');
    navList.classList.remove('navigation__list--opened');
    navList.classList.add('navigation__list--closed');
    locationButton.classList.remove('location__button--closed');
    locationButton.classList.add('location__button--opened');
  } else {
    locationGroup.classList.add('location__group--closed');
    locationGroup.classList.remove('location__group--opened');
    locationButton.classList.add('location__button--closed');
    locationButton.classList.remove('location__button--opened');
    navButton.classList.remove('navigation__button--closed');
    navButton.classList.add('navigation__button--opened');
  }
});
