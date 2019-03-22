import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('<Search />', () => {
  it('sets the value of the search input', () => {
    const wrapper = shallow(<Search searchTerm={'witch'} />);
    const input = wrapper.find('input[type="search"]');

    expect(input).toHaveProp('value', 'witch');
  });

  it('prevents default event handling on submit', () => {
    const onSubmit = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = shallow(<Search onSubmit={onSubmit} />);
    const form = wrapper.find('form');

    form.simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls the given onChange function with the search text on change', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Search onChange={onChange} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'witch' } });

    expect(onChange).toHaveBeenCalledWith('witch');
  });
});
