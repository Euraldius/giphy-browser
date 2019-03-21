this.userGoesBackToTrendingGifs = function (browser) {
  browser
  .url('http://localhost:3001')
  .waitForElementVisible('body');

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > button')
  .expect.element('.gif-column:first-of-type > .gif-wrapper:first-of-type > img')
  .to.have.attribute('alt').equals('You found me!');

  browser
  .click('.back-to-trending')
  .expect.element('.gif-column:first-of-type > .gif-wrapper:first-of-type > img')
  .to.have.attribute('alt').equals('emma goldman kicks butt');
};
