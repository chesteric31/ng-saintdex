import { browser, element, by, Key } from 'protractor';

export class SaintSeiyaPage {
  navigateTo() {
    return browser.get('/allArmors');
  }

  getCardElements() {
    return element.all(by.css('.card--media'));
  }

  getFirstCardElement() {
    return element(by.css('.card--media'));
  }

  getOpenModalElement() {
    return element(by.tagName('app-modal'));
  }

  getOpenModalHeadingElement() {
    return element(by.css('app-modal h1'));
  }

  selectNextKey() {
    browser
      .actions()
      .sendKeys(Key.ARROW_RIGHT)
      .perform();
  }

  selectPrevKey() {
    browser
      .actions()
      .sendKeys(Key.ARROW_LEFT)
      .perform();
  }

  selectEscapeKey() {
    browser
      .actions()
      .sendKeys(Key.ESCAPE)
      .perform();
  }
}
