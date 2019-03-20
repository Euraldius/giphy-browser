this.userSearchesForGifs = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > input[type="submit"]')
  .getText('.search-results', result => {
    browser.assert.equal(result.value, 'Your search for "witch" has 120 results.');
  })
  .getAttribute('.gif:first-of-type > img', 'alt', result => {
    browser.assert.equal(result.value, 'You found me!');
  });

  browser.end();
}
