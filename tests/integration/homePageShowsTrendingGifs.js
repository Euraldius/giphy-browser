module.exports = {
  'Home page shows trending gifs': browser => {
    browser
      .url('http://localhost:3001')
      .waitForElementVisible('body')
      .assert.containsText('body', 'Trending gifs!')
      .waitForElementVisible('.gif')
      .end();
  }
};
