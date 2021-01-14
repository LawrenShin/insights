import {call, put, takeEvery} from 'redux-saga/effects';
import {Creds, FetchTokenAction, Token, TokenActionTypes} from "./types";
import {RequestStatus} from "../api/types";
import {fetchToken} from "../api";
import {CreateAction} from "../../store/action";

const outtaStorage = localStorage.getItem('token');

const initState = {
  token: outtaStorage || '',
  error: null,
  status: RequestStatus.STILL,
}


function* workerSaga(action: FetchTokenAction) {
  try {
    const token = yield call(fetchToken, action.payload as Creds);
    yield put(CreateAction(TokenActionTypes.FETCH_TOKEN_SUCCESS, token));
  } catch (error) {
    yield put(CreateAction(TokenActionTypes.FETCH_TOKEN_FAIL, error.message));
  }
}

export function* watcherSaga() {
  yield takeEvery(TokenActionTypes.FETCH_TOKEN, workerSaga);
}


export function Reducer (state: Token = initState, action: FetchTokenAction) {
  if (action.type === TokenActionTypes.FETCH_TOKEN)
    return {...state, status: RequestStatus.LOADING};

  if (action.type === TokenActionTypes.FETCH_TOKEN_SUCCESS) {
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      status: RequestStatus.STILL,
      token: action.payload.token,
    }
  }

  if (action.type === TokenActionTypes.FETCH_TOKEN_FAIL)
    return {...state, status: RequestStatus.FAIL, error: action.payload.error}

  return state;
}
