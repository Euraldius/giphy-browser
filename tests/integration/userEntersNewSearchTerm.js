this.userEntersNewSearchTerm = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > button')
  .expect.element('.gif-column:first-of-type > .gif-wrapper:first-of-type > img')
  .to.have.attribute('alt').equals('You found me!');

  browser
  .clearValue('.search > input[type="text"]')
  .setValue('.search > input[type="text"]', 'black cats')
  .click('.search > button')
  .expect.element('.gif-column:first-of-type > .gif-wrapper:first-of-type > img')
  .to.have.attribute('alt').equals('Purrr');

  browser.end();
}
