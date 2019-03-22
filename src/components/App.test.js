import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('fetches gifs on mount', () => {
    const fetchTrendingGifs = jest.fn();
    shallow(<App gifs={[]} fetchTrendingGifs={fetchTrendingGifs} />);

    expect(fetchTrendingGifs).toHaveBeenCalled();
  });

  describe('when there is not an empty search', () => {
    it('hides the prompt to search again', () => {
      const wrapper = shallow(
        <App emptySearch={false} fetchTrendingGifs={() => {}} />
      );

      expect(wrapper).not.toContainMatchingElement('.no-search-results');
    });
  });

  describe('when there is an empty search', () => {
    it('prompts the user to search again', () => {
      const wrapper = shallow(
        <App
          currentSearch="witch"
          emptySearch
          gifs={[]}
          fetchTrendingGifs={() => {}}
        />
      );
      const noSearchResults = wrapper.find('.no-search-results');

      expect(noSearchResults).toIncludeText(
        'Your search for "witch" returned no results.',
      );
      expect(noSearchResults).toContainMatchingElement('Connect(Search)');
    });
  });

  describe('when infinite scroll is enabled', () => {
    it('renders a waypoint to trigger the load of more gifs', () => {
      const loadMoreGifs = jest.fn();
      const wrapper = shallow(
        <App
          enableInfiniteScroll
          gifs={[]}
          fetchTrendingGifs={() => {}}
          loadMoreGifs={loadMoreGifs}
        />
      );
      const waypoint = wrapper.find('Waypoint');

      expect(waypoint).toHaveProp('onEnter', loadMoreGifs);
    });
  });

  describe('when infinite scroll is disabled', () => {
    it('does not render a waypoint for loading more gifs', () => {
      const wrapper = shallow(
        <App
          enableInfiniteScroll={false}
          gifs={[]}
          fetchTrendingGifs={() => {}}
        />
      );

      expect(wrapper).not.toContainMatchingElement('Waypoint');
    });
  });
});
