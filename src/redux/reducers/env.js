import { giphyApiKey, giphyApiHost } from '../../env';

const envInitialState = {
  giphyApiHost,
  giphyApiKey,
};

const envReducers = (state = envInitialState) => (state);

export default envReducers;
