import { browser, by, element, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getComponent() {
    return element(by.tagName('app-content-editable'));
  }

  getTextarea() {
    return element(by.tagName('app-content-editable textarea'));
  }

  getLogPanel() {
    return element(by.tagName('.log'));
  }

  async doubleClickComponent() {
    return browser.actions().doubleClick(this.getComponent()).perform();
  }

  async clearTextarea() {
    return browser.actions().sendKeys(Key.chord(Key.CONTROL, 'a')).sendKeys(Key.DELETE).perform();
  }

  async typeInTextarea(content) {
    return browser.actions().sendKeys(content).perform();
  }

  // used to disable editing
  async clickLogPanel() {
    return browser.actions().click(this.getLogPanel()).perform();
  }

  async wait(time) {
    return browser.pause(time);
  }
}
