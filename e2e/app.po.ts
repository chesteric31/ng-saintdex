import { browser, element, by } from 'protractor';

export class NgPage {
  navigateTo() {
    return browser.get('/home');
  }

  getHeadingText() {
    return element(by.css('app-root app-header a')).getText();
  }
}
