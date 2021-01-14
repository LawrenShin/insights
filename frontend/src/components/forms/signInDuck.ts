import {call, put, takeEvery} from 'redux-saga/effects';
import {Creds, FetchTokenAction, Token, TokenActionTypes} from "./types";
import {RequestStatus} from "../api/types";
import {fetchToken} from "../api";
import {CreateAction} from "../../store/action";

const initState = {
  token: '',
  error: null,
  status: RequestStatus.STILL,
}

function* workerSaga(action: FetchTokenAction) {
  try {
    const token = yield call(fetchToken, action.payload as Creds);
    yield console.log(token);
    yield put(CreateAction(TokenActionTypes.FETCH_TOKEN_SUCCESS, token));
  } catch (error) {
    yield put(CreateAction(TokenActionTypes.FETCH_TOKEN_FAIL, error.message));
  }
}

export function* watcherSaga() {
  yield takeEvery(TokenActionTypes.FETCH_TOKEN, workerSaga);
}

