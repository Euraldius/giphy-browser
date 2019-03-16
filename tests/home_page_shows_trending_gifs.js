module.exports = {
  'Home page shows trending gifs': browser => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.containsText('body', 'Trending gifs!')
      .end();
  }
};
