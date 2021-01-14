import {fork} from 'redux-saga/effects';
// import {WatchListSelectSaga} from '../pages/CompaniesDuck';
import {watcherSaga as SignInSaga} from '../components/forms/signInDuck';

export default function* rootSaga() {
  yield fork(SignInSaga);
}