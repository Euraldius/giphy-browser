import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('fetches and displays trending gifs from giphy', done => {
    const mockGifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetch.mockResponse(JSON.stringify({ data: mockGifs }))
    const wrapper = shallow(<App />);

    setTimeout(() => {
      const gif = wrapper.find('Gif');
      expect(gif).toBeDefined();
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toMatch(new RegExp('^https://api.giphy.com/v1/gifs/trending'));

      done();
    }, 1);
  });

  it('catches failed requests to giphy', done => {
    fetch.mockReject();
    const wrapper = shallow(<App />);

    setTimeout(() => {
      const error = wrapper.find('.error');
      expect(error).toHaveText('There was an error fetching gifs. If you really really need them, try reloading the page.');

      done();
    }, 1);
  });
});
