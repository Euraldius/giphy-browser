import { giphyApiKey, giphyApiHost } from '../../env';

const envInitialState = {
  giphyApiHost: giphyApiHost(),
  giphyApiKey,
};

const envReducers = (state = envInitialState) => {
  return state;
};

export default envReducers;
