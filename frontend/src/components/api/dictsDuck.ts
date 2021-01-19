import {CreateAction} from "../../store/action";
import {Dictionaries, RequestStatus} from "./types";
import {fetchDicts} from "./index";
import {call, put, takeEvery} from "redux-saga/effects";


export enum DictActionTypes {
  DICT_LOAD = 'DICT_LOAD',
  DICT_LOAD_SUCCESS = 'DICT_LOAD_SUCCESS',
  DICT_LOAD_FAIL = 'DICT_LOAD_FAIL',
}

export interface DictLoadType {
  type: DictActionTypes.DICT_LOAD;
  payload: string;
}
export interface DictFailType {
  type: DictActionTypes.DICT_LOAD_FAIL;
  payload: string;
}
export interface DictSuccessType {
  type: DictActionTypes.DICT_LOAD_SUCCESS;
  payload: Dictionaries;
}

export interface Data {
  data: Dictionaries | null;
  error: null | string;
  status: RequestStatus;
}

export type DictActionType = DictLoadType | DictFailType | DictSuccessType;


export const loadDicts = () => CreateAction(DictActionTypes.DICT_LOAD);
export const loadDictSuccess = (dictionaries: Dictionaries) => CreateAction(DictActionTypes.DICT_LOAD_SUCCESS, dictionaries);
export const loadDictFail = (error: string) => CreateAction(DictActionTypes.DICT_LOAD_FAIL, error);


export function* workerSaga (action: DictActionType) {
  try {
    const dicts = yield call(fetchDicts);
    yield put(loadDictSuccess(dicts));
  } catch (error) {
    yield put(loadDictFail(error.message));
  }
}

export function* watcherSaga() {
  yield takeEvery(DictActionTypes.DICT_LOAD, workerSaga);
}

interface InitState {
  data: null | Dictionaries;
  status: RequestStatus;
  error: string | null;
}

const initState = {
  data: null,
  status: RequestStatus.STILL,
  error: null,
}

export function Reducer (state: InitState = initState, action: DictActionType) {
  if (action.type === DictActionTypes.DICT_LOAD) return {
    ...state,
    status: RequestStatus.LOADING,
  }

  if (action.type === DictActionTypes.DICT_LOAD_SUCCESS) return {
    ...state,
    status: RequestStatus.STILL,
    data: action.payload,
  }

  if (action.type === DictActionTypes.DICT_LOAD_FAIL) return {
    ...state,
    status: RequestStatus.FAIL,
    error: action.payload
  }

  return state;
}