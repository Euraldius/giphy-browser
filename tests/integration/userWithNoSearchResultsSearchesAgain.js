this.userWithNoSearchResultsSearchesAgain = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
    .setValue('.search > input[type="text"]', 'no results')
    .click('.search > input[type="submit"]')
    .expect.element('.no-search-results').text.to.contain(
      'Your search for "no results" returned no results.',
    );

  browser
    .setValue('.search > input[type="text"]', 'witch')
    .click('.search > input[type="submit"]')

  browser.expect.element('.gif:first-of-type > img')
    .to.have.attribute('alt').equals('You found me!');

  browser.end();
};
