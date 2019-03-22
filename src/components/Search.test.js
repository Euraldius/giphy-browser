import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('<Search />', () => {
  it('sets the value of the search input', () => {
    const wrapper = shallow(<Search />);
    let input = wrapper.find('input[type="search"]');

    input.simulate('change', { target: { value: 'witch' } });

    input = wrapper.find('input[type="search"]');
    expect(input).toHaveProp('value', 'witch');
  });

  it('calls the given onSubmit function with the search text', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Search onSubmit={onSubmit} />);
    const input = wrapper.find('input[type="search"]');
    const form = wrapper.find('form');

    input.simulate('change', { target: { value: 'witch' } });
    form.simulate('submit', { preventDefault: () => {} });

    expect(onSubmit).toHaveBeenCalledWith('witch');
  });
});
