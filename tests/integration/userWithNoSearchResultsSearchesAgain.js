this.userWithNoSearchResultsSearchesAgain = function (browser) {
  browser
    .url('http://localhost:3001')
    .waitForElementVisible('body');

  browser
    .setValue('.search > input[type="search"]', 'no results')
    .click('.search > button')
    .expect.element('.no-search-results').text.to.contain(
      'Your search for "no results" returned no results.',
    );

  browser
    .setValue('.search > input[type="search"]', 'witch')
    .expect.element('.search > input[type="search"]')
    .to.have.attribute('value').equals('witch');

  browser.click('.search > button')

  browser.expect.element('.gif-column:first-of-type > .gif-wrapper:first-of-type > img')
    .to.have.attribute('alt').equals('You found me!');
};
