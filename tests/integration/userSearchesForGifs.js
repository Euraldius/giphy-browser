this.userSearchesForGifs = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > input[type="submit"]')
  .getAttribute('.gif:first-of-type > img', 'alt', result => {
    browser.assert.equal(result.value, 'You found me!');
  });

  browser.end();
}
