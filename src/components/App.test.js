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

  describe('when infinite scroll is active and the user is searching for a gif', () => {
    it('infinitely scrolls the search results', () => {
      const searchForGifs = jest.fn();
      const gifs = [{ id: 'test-id' }];
      const wrapper = shallow(
        <App
          fetchTrendingGifs={() => {}}
          gifs={gifs}
          searchForGifs={searchForGifs}
          searchTerm={'witch'}
          searching={true}
        />
      );
      const waypoint = wrapper.find('Waypoint');
      const onEnter = waypoint.prop('onEnter');

      onEnter();

      expect(searchForGifs.mock.calls[0][0]).toEqual('witch');
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

  describe('when the user has performed a search', () => {
    it('displays a search result status', () => {
      const wrapper = shallow(
        <App
          fetchTrendingGifs={() => {}}
          gifs={[]}
          searchResultTotal={120}
          searchTerm="witch"
          searching={true}
        />
      );
      const header = wrapper.find('header h1');

      expect(header).toIncludeText('search results');
      expect(wrapper).toIncludeText('Your search for "witch" has 120 results');
    });
  });

  describe('when the user is not searching', () => {
    it('does not display a search status', () => {
      const wrapper = shallow(
        <App fetchTrendingGifs={() => {}} gifs={[]} searching={false} />
      );
      const header = wrapper.find('header h1');

      expect(header).toIncludeText('trending gifs');
      expect(wrapper).not.toContainMatchingElement('.search-results');
    });
  });

  describe('when a search returns with no results', () => {
    it('prompts the user to search again', () => {
      const wrapper = shallow(
        <App
          fetchTrendingGifs={() => {}}
          gifs={[]}
          searchResultTotal={0}
          searchTerm="good governance"
          searching={true}
        />
      );
      const header = wrapper.find('header');

      expect(wrapper).toIncludeText(
        'Your search for "good governance" returned no results.'
      );
      expect(header).not.toContainMatchingElement('Search');
      expect(wrapper).toContainMatchingElement('Search');
    });
  });
});
