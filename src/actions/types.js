import { createActionTypes } from '../utils';

export const USER_ACTION_TYPES = createActionTypes('USER_ACTION_TYPES', [
  'GET',
  'GET_RESULTS',
  'DELETE',
]);
