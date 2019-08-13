import { createAction } from '../utils';
import { USER_ACTION_TYPES } from './types';

export const userAction = {
  getItems: () => createAction(USER_ACTION_TYPES.GET, { }),
  getItemsSucess: (data) => createAction(USER_ACTION_TYPES.GET_RESULTS, { data, error: null, loading: false }),
  getItemsError: (error) => createAction(USER_ACTION_TYPES.GET_RESULTS, { ...error, data: [] }),
  deleteUser: (user) => createAction(USER_ACTION_TYPES.DELETE, user),
};
