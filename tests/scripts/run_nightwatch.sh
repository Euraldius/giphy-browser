trap "kill 0" EXIT

REACT_APP_TEST_ENV=nightwatch PORT=3001 BROWSER=none npm start &
node ./tests/support/fakeGiphyServer.js &
sleep 1
npx nightwatch
