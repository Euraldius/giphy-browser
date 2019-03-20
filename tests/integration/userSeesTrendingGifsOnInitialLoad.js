module.exports = {
  'User sees trending gifs on initial load': browser => {
    browser
      .url('http://localhost:3001')
      .waitForElementVisible('body')
      .waitForElementVisible('.gif:first-of-type')

    browser.expect.element('body').text.to.contain('trending gifs');

    browser.end();
  }
};
