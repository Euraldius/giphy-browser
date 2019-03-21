import React from 'react';
import { shallow } from 'enzyme';
import GifGrid from './GifGrid';

describe('<GifGrid />', () => {
  it('calculates the number of columns dynamically based on window size', () => {
    const gifs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
      { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 },
      { id: 12 }, { id: 13 }, { id: 14 }];
    const columnWidthPx = 210;
    const columnCount = parseInt(window.innerWidth / columnWidthPx, 10);
    const wrapper = shallow(<GifGrid gifs={gifs} />);

    expect(wrapper).toContainMatchingElements(columnCount, 'GifColumn');
  });

  it('calculates the padding of the grid container', () => {
    const gifs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
      { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 },
      { id: 12 }, { id: 13 }, { id: 14 }];
    const columnWidthPx = 210;
    const columnCount = parseInt(window.innerWidth / columnWidthPx, 10);
    const containerWidth = columnCount * columnWidthPx - 10;
    const paddingPx = parseInt((window.innerWidth - containerWidth) / 2, 10);
    const wrapper = shallow(<GifGrid gifs={gifs} />);
    const gridContainer = wrapper.find('.gifs');

    expect(gridContainer).toHaveStyle('paddingLeft', `${paddingPx}px`);
    expect(gridContainer).toHaveStyle('paddingRight', `${paddingPx}px`);
  });
});
