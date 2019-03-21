import React from 'react';
import { shallow } from 'enzyme';
import Gif from './Gif';

describe('<Gif />', () => {
  describe('on click', () => {
    it('shows a full size version of the image', () => {
      const gif = {
        title: 'Test gif',
        images: {
          fixed_width: {
            url: 'http://image.test/fixed_width',
          },
          original: {
            url: 'http://image.test/full_size',
          },
        },
      };
      const wrapper = shallow(<Gif gif={gif} />);

      const image = wrapper.find('img');
      expect(image).toHaveProp('src', 'http://image.test/fixed_width')

      image.simulate('click');

      const fullSizeImage = wrapper.find('.full-size-gif img');
      expect(fullSizeImage).toHaveProp('src', 'http://image.test/full_size')
    });
  });

  describe('full size gif on click', () => {
    it('closes the full size gif', () => {
      const gif = {
        title: 'Test gif',
        images: {
          fixed_width: {
            url: 'http://image.test/fixed_width',
          },
          original: {
            url: 'http://image.test/full_size',
          },
        },
      };
      const wrapper = shallow(<Gif gif={gif} />);

      const image = wrapper.find('img');
      image.simulate('click');

      const closeButton = wrapper.find('.close-full-size button');
      closeButton.simulate('click');

      expect(wrapper).not.toContainMatchingElement('.full-size-gif');
    });
  });
});
