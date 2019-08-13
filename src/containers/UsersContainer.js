import React, { useEffect } from 'react';
import {
  useDispatch, useSelector, shallowEqual
} from 'react-redux';

import { userAction } from '../actions';
import Listing from '../components/users/Listing';

function UsersContainer() {
  const reducer = useSelector((state) => state.get('UsersReducer'), shallowEqual);
  let users = reducer.get('data');
  users = Array.isArray(users) ? users : [];
  const dispatch = useDispatch();

  const deleteUser = (user) => dispatch(userAction.deleteUser(user));

  useEffect(() => {
    dispatch(userAction.getItems());
  }, []);
  return (
    <Listing
      users={users}
      deleteUser={deleteUser}
    />
  );
}

export default UsersContainer;
