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
    const wrapper = shallow(<App giphyApiHost='http://crimethinc.com' />);

    setTimeout(() => {
      const gif = wrapper.find('Gif');
      expect(gif).toBeDefined();
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toMatch(new RegExp('^http://crimethinc.com/v1/gifs/trending'));

      done();
    });
  });

  it('catches failed requests to giphy', done => {
    fetch.mockReject();
    const wrapper = shallow(<App />);

    setTimeout(() => {
      const error = wrapper.find('.error');
      expect(error).toHaveText('There was an error fetching gifs. If you really really need them, try reloading the page.');

      done();
    });
  });

  it('adds more gifs when the user reaches the bottom of the page', done => {
    const mockGifs = [{ type: 'gif', id: 'test-id', url: 'http://giphy.com/test-id' }];
    fetch.mockResponseOnce(JSON.stringify({ data: mockGifs, pagination: { offset: 0, count: 1 } }))
    fetch.mockResponseOnce(JSON.stringify({ data: mockGifs, pagination: { offset: 1, count: 1 } }))
    const wrapper = shallow(<App />);

    setTimeout(() => {
      wrapper.instance().scrollInfinitely();
    });

    setTimeout(() => {
      const gifs = wrapper.find('Gif');

      expect(gifs.length).toBe(2);
      expect(fetch.mock.calls.length).toBe(2);
      expect(fetch.mock.calls[1][0]).toMatch(/offset=2/);

      done();
    }, 5);
  });
});
