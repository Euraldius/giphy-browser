import React from 'react';
import { shallow } from 'enzyme';
import Gif from './Gif';

describe('<Gif />', () => {
  describe('on click', () => {
    it('shows a full size version of the image', () => {
      const gif = {
        title: 'Test gif',
        images: {
          fixed_height: {
            url: 'http://image.test/fixed_height',
          },
          original: {
            url: 'http://image.test/full_size',
          },
        },
      };
      const wrapper = shallow(<Gif gif={gif} />);

      const image = wrapper.find('img');
      expect(image).toHaveProp('src', 'http://image.test/fixed_height')

      image.simulate('click');

      const fullSizeImage = wrapper.find('.full-size-gif img');
      expect(fullSizeImage).toHaveProp('src', 'http://image.test/full_size')
    });
  });
});
