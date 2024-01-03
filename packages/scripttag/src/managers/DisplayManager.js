import {render} from 'preact';
import React from 'preact/compat';
import {delay} from '../helpers/delay';
import {insertAfter} from '../helpers/insertHelpers';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();
    this.displayPopups(notifications, settings);
  }

  async displayPopups(notifications, settings) {
    await delay(settings.firstDelay);
    for (let i = 0; i < settings.maxPopsDisplay; i++) {
      this.display({notification: notifications[i], settings: settings});
      await delay(settings.displayDuration);
      this.fadeOut();
      if (i < settings.maxPopsDisplay - 1) {
        await delay(settings.popsInterval);
      }
      if (i === settings.maxPopsDisplay - 1) {
        this.fadeRemove();
      }
    }
  }

  fadeRemove() {
    const container = document.querySelector('#Avada-SalePop');
    container.remove();
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'none';
  }

  display({notification, settings}) {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'block';
    render(<NotificationPopup {...notification} settings={settings} />, container);
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
