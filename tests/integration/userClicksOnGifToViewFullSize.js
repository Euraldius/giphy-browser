this.userClicksOnGifToViewFullSize = function (browser) {
  const firstGifOnPage = '.gif:first-of-type > img';

  browser
    .url('http://localhost:3001')
    .waitForElementVisible('body')
    .waitForElementVisible(firstGifOnPage);

  browser.getAttribute(firstGifOnPage, 'src', result => {
    browser.assert.equal(result.value, 'http://localhost:3002/black-cat-small.gif');
  });

  browser.click(firstGifOnPage)
    .waitForElementVisible('.full-size-gif')
    .getAttribute('.full-size-gif img', 'src', result => {
      browser.assert.equal(result.value, 'http://localhost:3002/black-cat.gif');
  });

  browser.click('.close-full-size')
    .waitForElementNotPresent('.full-size-gif')
    .end();
}
