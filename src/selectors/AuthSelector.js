import { createSelector } from 'reselect';

const usersState = (state) => state.get('AuthReducer');

const authStateDataSelector = () => createSelector(
  usersState,
  (state) => {
    const data = state.get('data');

    return data;
  },
);

export { authStateDataSelector };
