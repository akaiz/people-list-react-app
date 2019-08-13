import { combineReducers } from 'redux-immutable';
import UsersReducer from './UsersReducer';

const rootReducer = (asyncReducers) => combineReducers({
  UsersReducer,
  ...asyncReducers,
});

export default rootReducer;
