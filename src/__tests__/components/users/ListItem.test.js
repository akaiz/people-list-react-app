import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Avatar from 'react-avatar';
import renderer from 'react-test-renderer';
import ListItem from '../../../components/users/ListItem';

import { apiResponse, findByAttr } from '../../TestHelper';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = mount(
    <DndProvider backend={HTML5Backend}>
      <ListItem {...props} />
    </DndProvider>);
  return component;
};


describe('<ListItem> Tests', () => {
  let wrapper;
  const user = apiResponse(1).data[0];
  const props = {
    data: user, index: 1, id: 1, deleteUser: jest.fn(() => {})
  };
  beforeEach(() => {
    wrapper = setUp(props);
  });

  describe('Checking Props', () => {
    it('Should receive the sent props', () => {
      expect(wrapper.find(ListItem).props()).toStrictEqual(props);
    });
  });

  describe('Check rendered details', () => {
    it('Should render user name ', () => {
      expect(findByAttr(wrapper.find(ListItem), 'user-name').text()).toBe(props.data.name);
    });

    it('Should render user organization ', () => {
      expect(findByAttr(wrapper.find(ListItem), 'user-org').text().trim()).toMatch(user.org_name);
    });

    it('Should render user photo ', () => {
      expect(wrapper.find(ListItem).find(Avatar).length).toBe(1);
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <ListItem {...props} />
        </DndProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
