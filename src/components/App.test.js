import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('fetches gifs on mount', () => {
    const fetchTrendingGifs = jest.fn();
    shallow(<App gifs={[]} fetchTrendingGifs={fetchTrendingGifs} />);

    expect(fetchTrendingGifs).toHaveBeenCalled();
  });

  describe('when the gif list is refreshing', () => {
    it('does not render the gif grid', () => {
      const wrapper = shallow(
        <App gifListRefreshing gifs={[]} fetchTrendingGifs={() => {}} />
      );

      expect(wrapper).not.toContainMatchingElement('GifGrid');
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

  describe('when all gifs have been loaded already', () => {
    it('does not enable infinite scroll', () => {
      const wrapper = shallow(
        <App
          allGifsLoaded={true}
          fetchTrendingGifs={() => {}}
          gifs={[{ id: 'gif' }]}
          isFetching={false}
        />
      );

      expect(wrapper).not.toContainMatchingElement('Waypoint');
    });
  });

  describe('when infinite scroll is active and the user is searching for a gif', () => {
    it('infinitely scrolls the search results', () => {
      const searchForGifs = jest.fn();
      const gifs = [{ id: 'test-id' }];
      const wrapper = shallow(
        <App
          fetchTrendingGifs={() => {}}
          gifs={gifs}
          searchForGifs={searchForGifs}
          searching={true}
        />
      );
      const waypoint = wrapper.find('Waypoint');
      const onEnter = waypoint.prop('onEnter');

      onEnter();

      expect(searchForGifs).toHaveBeenCalled();
    });
  });

  describe('when infinite scroll is active and the user is not searching for a gif', () => {
    it('infinitely scrolls trending gifs', () => {
      const fetchTrendingGifs = jest.fn();
      const gifs = [{ id: 'test-id' }];
      const wrapper = shallow(
        <App
          fetchTrendingGifs={fetchTrendingGifs}
          gifs={gifs}
          searching={false}
        />
      );
      const waypoint = wrapper.find('Waypoint');

      expect(waypoint).toHaveProp('onEnter', fetchTrendingGifs);
    });
  });

  describe('when a search returns with no results', () => {
    it('prompts the user to search again', () => {
      const wrapper = shallow(
        <App
          fetchTrendingGifs={() => {}}
          gifs={[]}
          searchResultTotal={0}
          lastSearch="good governance"
          searching={true}
        />
      );
      const header = wrapper.find('header');

      expect(wrapper).toIncludeText(
        'Your search for "good governance" returned no results.'
      );
      expect(header).not.toContainMatchingElement('Connect(Search)');
      expect(wrapper).toContainMatchingElement('Connect(Search)');
    });
  });
});
