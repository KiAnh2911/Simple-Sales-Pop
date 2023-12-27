import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'react';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

// const delay = s => new Promise(res => setTimeout(res, s * 1000));
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  display({notification}, settings) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} settings={settings} />, container);
    container.classList.remove('fadeOut');
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
