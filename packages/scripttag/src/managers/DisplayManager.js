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
    if (this.isShowPopupUrls(settings)) {
      this.insertContainer();
      this.displayPopups(notifications, settings);
    }
  }

  async displayPopups(notifications, settings) {
    await delay(settings.firstDelay);
    for (let i = 0; i < settings.maxPopsDisplay; i++) {
      this.display({notification: notifications[i], settings: settings});
      await delay(settings.displayDuration);
      this.fadeOut();
      await delay(settings.popsInterval);
      if (i === settings.maxPopsDisplay - 1) {
        this.fadeRemove();
      }
    }
  }

  isShowPopupUrls(settings) {
    const {includedUrls, excludedUrls, allowShow} = settings;
    const currentUrl = window.location.href;

    const listIncludedUrls = includedUrls.split('\n').map(url => url.trim());
    const listExcludedUrls = excludedUrls.split('\n').map(url => url.trim());

    if (allowShow === 'all' && !listExcludedUrls.includes(currentUrl)) {
      return true;
    }
    if (allowShow === 'specific' && listIncludedUrls.includes(currentUrl)) {
      return true;
    }
    return false;
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
    render(
      <NotificationPopup {...notification} settings={settings} closePopup={this.fadeRemove} />,
      container
    );
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
