import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import UsersContainer from '../../containers/UsersContainer';
import { apiResponse } from '../TestHelper';

configure({ adapter: new Adapter() });

const mockState = fromJS({
  data: [],
  error: null,
  loading: false,
});

const setUp = (props = {}) => {
  const store = createMockStore(mockState);
  return shallow(<Provider store={store}><UsersContainer {...props} /></Provider>);
};

describe('<UsersContainer> Tests', () => {
  let wrapper;
  const props = { users: apiResponse().data, deleteUser: jest.fn(() => {}) };
  beforeEach(() => {
    wrapper = setUp(props);
  });

  it('It renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });
});
