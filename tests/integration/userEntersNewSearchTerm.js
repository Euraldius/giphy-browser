this.userEntersNewSearchTerm = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > button')
  .getAttribute('.gif-column:first-of-type > .gif-wrapper:first-of-type > img', 'alt', result => {
    browser.assert.equal(result.value, 'You found me!');
  });

  browser
  .clearValue('.search > input[type="text"]')
  .setValue('.search > input[type="text"]', 'black cats')
  .click('.search > button')
  .getAttribute('.gif-column:first-of-type > .gif-wrapper:first-of-type > img', 'alt', result => {
    browser.assert.equal(result.value, 'Purrr');
  });

  browser.end();
}
