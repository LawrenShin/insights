import {fork} from 'redux-saga/effects';
import {watcherSaga as ListSaga} from '../components/listDuck';
import {watcherSaga as SignInSaga} from '../components/forms/signInDuck';

export default function* rootSaga() {
  yield fork(SignInSaga);
  yield fork(ListSaga);
}