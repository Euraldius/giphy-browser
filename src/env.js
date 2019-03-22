const MOCK_GIPHY_API_HOST = 'http://localhost:3002';
const inTestEnv = process.env.NODE_ENV === 'test' || process.env.REACT_APP_TEST_ENV === 'nightwatch';

export const giphyApiHost = inTestEnv ? MOCK_GIPHY_API_HOST : process.env.REACT_APP_GIPHY_API_HOST;
export const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY;
