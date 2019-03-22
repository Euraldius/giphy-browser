this.userSearchesForGifs = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="search"]', 'witch')
  .click('.search > button')
  .setValue('.search > input[type="search"]', 'w');

  browser.expect.element('.search-results').text.to.contain(
    'Your search for "witch" has 1000 results.'
  );

  browser.expect.element(
    '.gif-column:first-of-type > .gif-wrapper:first-of-type > img'
  ).to.have.attribute('alt').equals('You found me!');
}
