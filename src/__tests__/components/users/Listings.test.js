import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Listing from '../../../components/users/Listing';
import ListItem from '../../../components/users/ListItem';
import { apiResponse, checkProps, findByAttr } from '../../TestHelper';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = mount(<Listing {...props} />);
  return component;
};

describe('<Listing> Tests', () => {
  let wrapper;
  const props = { users: apiResponse().data, deleteUser: jest.fn(() => {}) };
  beforeEach(() => {
    wrapper = setUp(props);
  });

  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const propsError = checkProps(wrapper, props);
      expect(propsError).toBeUndefined();
    });
  });

  it('Should render users list', () => {
    const component = findByAttr(wrapper, 'user-listing');
    expect(component.length).toBe(1);
  });

  it('Should renders the correct paginated users', () => {
    expect(wrapper.find(ListItem).length).toBe(10);
  });
  it('Should filter users', () => {
    const input = wrapper.find('.user-search').find('.form-control');
    input.simulate('change', { target: { value: apiResponse().data[0].name } });
    expect(wrapper.find(ListItem).length).toBe(1);

    input.simulate('change', { target: { value: '' } });
    expect(wrapper.find(ListItem).length).toBe(10);
  });
});
