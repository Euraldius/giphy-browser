import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

describe('<AppHeader />', () => {
  describe('when there is no error', () => {
    it('does not show the error element', () => {
      const wrapper = shallow(<AppHeader error={null} />);

      expect(wrapper).not.toContainMatchingElement('.error');
    });
  });

  describe('when there is an error', () => {
    it('shows the error element', () => {
      const wrapper = shallow(<AppHeader error="There is an error" />);
      const error = wrapper.find('.error');

      expect(error).toHaveText('There is an error');
    });
  });

  describe('when the user has performed a search', () => {
    it('displays a search result status', () => {
      const wrapper = shallow(
        <AppHeader
          lastSearch="witch"
          searchResultTotal={120}
          searching={true}
        />
      );

      expect(wrapper).toIncludeText('search results');
      expect(wrapper).toIncludeText('Your search for "witch" has 120 results');
    });

    it('allows the user to go back to trending gifs', () => {
      const showTrendingGifs = jest.fn();
      const wrapper = shallow(
        <AppHeader searching showTrendingGifs={showTrendingGifs} />
      );
      const backToTrendingButton = wrapper.find('.back-to-trending');

      backToTrendingButton.simulate('click');

      expect(showTrendingGifs).toHaveBeenCalled();
    });
  });

  describe('when the user is not searching', () => {
    it('does not display a search status', () => {
      const wrapper = shallow(
        <AppHeader searching={false} />
      );

      expect(wrapper).toIncludeText('trending gifs');
      expect(wrapper).not.toIncludeText('Show me trending gifs <3');
    });
  });
});
