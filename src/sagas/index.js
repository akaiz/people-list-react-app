import { all, fork } from 'redux-saga/effects';
import watchUsersSagas from './UsersSaga';

export default function* rootSaga() {
  yield all([fork(watchUsersSagas)]);
}
