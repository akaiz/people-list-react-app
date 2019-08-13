import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Avatar from 'react-avatar';

import ListItemModal from '../../../components/users/ListItemModal';

import { apiResponse } from '../../TestHelper';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = mount(
    <ListItemModal {...props} />);
  return component;
};

describe('<ListItemModal> Tests', () => {
  let wrapper;
  const user = apiResponse(1).data[0];
  const props = {
    data: user, showModal: true, toggleModal: jest.fn(() => {}), deleteUser: jest.fn(() => {})
  };
  beforeEach(() => {
    wrapper = setUp(props);
  });

  describe('Checking Props', () => {
    it('Should receive the sent props', () => {
      expect(wrapper.find(ListItemModal).props()).toStrictEqual(props);
    });
  });

  describe('Check rendered details', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(<ListItemModal {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render user name ', () => {
      expect(wrapper.find('.modal-user-name').text()).toBe(props.data.name);
    });

    it('Should render user phone ', () => {
      expect(wrapper.find('.modal-user-phone').text().trim()).toMatch(user.phone[0].value);
    });

    it('Should render user photo ', () => {
      expect(wrapper.find(Avatar).length).toBe(1);
    });
  });
});
