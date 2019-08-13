import {
  put, call, takeLatest, all
} from 'redux-saga/effects';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import { USER_ACTION_TYPES } from '../actions/types';
import { userAction } from '../actions';
import { baseUrl, token } from '../../config/default';

function* handleGet() {
  try {
    const { data } = yield call(
      axios.get,
      `${baseUrl}/persons?start=0&api_token=${token}`
    );
    yield put(userAction.getItemsSucess(data.data));
  } catch (e) {
    if (e.response) {
      if (e.response.status === 500 || e.response.status === 401) {
        yield put(userAction.getItemsError({ error: "Couldn't load users" }));
      }
    }
  }
}
function* handleDelete(action) {
  const user = action.payload;
  try {
    const { data: { success } } = yield call(
      axios.delete,
      `${baseUrl}/persons/${user.id}?api_token=${token}`
    );
    if (success) {
      ToastsStore.success('Person has been deleted');
      yield put(userAction.getItems());
    } else {
      ToastsStore.error('Person doesn\'t exist');
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 500 || e.response.status === 401) {
        ToastsStore.error('Person can\'t be deleted');
      }
    }
  }
}
function* watchUsersSagas() {
  yield all([takeLatest(USER_ACTION_TYPES.GET, handleGet)]);
  yield all([takeLatest(USER_ACTION_TYPES.DELETE, handleDelete)]);
}

export default watchUsersSagas;
