import {fork} from 'redux-saga/effects';
import {watcherSaga as ListSaga} from '../components/listDuck';
import {watcherSaga as SignInSaga} from '../components/forms/signInDuck';
import {watcherSaga as DictsSaga} from '../components/api/dictsDuck';
import {watcherSaga as AnyFormSaga} from '../components/forms/anyForm/anyFormDuck';

export default function* rootSaga() {
  yield fork(SignInSaga);
  yield fork(ListSaga);
  yield fork(DictsSaga);
  yield fork(AnyFormSaga);
}