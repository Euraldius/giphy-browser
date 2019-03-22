this.userSearchesForGifs = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
    .setValue('.search > input[type="search"]', 'witch')
    .click('.search > button')
    .getText('.search-results', result => {
      browser.assert.equal(result.value, 'Your search for "witch" has 1000 results.');
    })
    .getAttribute('.gif-column:first-of-type > .gif-wrapper:first-of-type > img', 'alt', result => {
      browser.assert.equal(result.value, 'You found me!');
    });

  browser.end();
}
