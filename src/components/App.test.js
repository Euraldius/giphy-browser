import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('fetches gifs on mount', () => {
    const fetchTrendingGifs = jest.fn();
    shallow(<App gifs={[]} fetchTrendingGifs={fetchTrendingGifs} />);

    expect(fetchTrendingGifs).toHaveBeenCalled();
  });

  describe('when there is no error', () => {
    it('does not show the error element', () => {
      const wrapper = shallow(<App gifs={[]} fetchTrendingGifs={() => {}} />);

      expect(wrapper).not.toContainMatchingElement('.error');
    });
  });

  describe('when there is an error', () => {
    it('shows the error element', () => {
      const wrapper = shallow(<App error="There is an error" gifs={[]} fetchTrendingGifs={() => {}} />);
      const error = wrapper.find('.error');

      expect(error).toHaveText('There is an error');
    });
  });

  describe('when there are gifs and there is no active request', () => {
    it('renders an infinite scroll waypoint', () => {
      const gifs = [{ id: 'test-id' }];
      const wrapper = shallow(<App isFetching={false} gifs={gifs} fetchTrendingGifs={() => {}} />);

      expect(wrapper).toContainMatchingElement('Waypoint');
    });
  });

  describe('when there is an active request', () => {
    it('does not render an infinite scroll waypoint', () => {
      const gifs = [{ id: 'test-id' }];
      const wrapper = shallow(<App isFetching={true} gifs={gifs} fetchTrendingGifs={() => {}} />);

      expect(wrapper).not.toContainMatchingElement('Waypoint');
    });
  });

  describe('when there are no gifs', () => {
    it('does not render an infinite scroll waypoint', () => {
      const wrapper = shallow(<App isFetching={false} gifs={[]} fetchTrendingGifs={() => {}} />);

      expect(wrapper).not.toContainMatchingElement('Waypoint');
    });
  });
});
