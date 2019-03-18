function scrollToBottomOfPage () {
  window.scrollTo(0, document.body.scrollHeight);
}

this.homePageInfinitelyScrollsSearchedGifs = function (browser) {
  let originalNumberOfGifs = 0;
  let scrolledNumberOfGifs = 0;

  browser
    .url('http://localhost:3001')
    .waitForElementVisible('body')

  browser
  .setValue('.search > input[type="text"]', 'witch')
  .click('.search > input[type="submit"]')

  browser.elements('css selector', '.gif > img[alt="You found me!"]',
    result => {
      originalNumberOfGifs = result.value.length;

      browser.execute(scrollToBottomOfPage, [], () => {
        browser.pause(1000);

        browser.elements('css selector', '.gif > img[alt="You found me!"]', result => {
          scrolledNumberOfGifs = result.value.length;

          browser.assert.notEqual(originalNumberOfGifs, 0);
          browser.assert.notEqual(scrolledNumberOfGifs, 0);
          browser.assert.equal(originalNumberOfGifs * 2, scrolledNumberOfGifs);

          browser.end();
        });
      });
    }
  );
}
