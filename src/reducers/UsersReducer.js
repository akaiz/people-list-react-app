import { fromJS } from 'immutable';
import { USER_ACTION_TYPES } from '../actions/types';

const initialState = fromJS({
  data: [],
  error: null,
  loading: false,
});

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.GET_RESULTS:
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default UsersReducer;
