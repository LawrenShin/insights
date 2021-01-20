import {CreateAction} from "../../store/action";
import {Dictionaries, Meta, RequestStatus} from "./types";
import {fetchDicts, fetchMeta} from "./index";
import {call, put, takeLatest} from "redux-saga/effects";


export enum DictActionTypes {
  DICT_LOAD = 'DICT_LOAD',
  DICT_LOAD_SUCCESS = 'DICT_LOAD_SUCCESS',
  DICT_LOAD_FAIL = 'DICT_LOAD_FAIL',
}

export enum MetaActionTypes {
  META_LOAD = 'META_LOAD',
  META_LOAD_SUCCESS = 'META_LOAD_SUCCESS',
  META_LOAD_FAIL = 'META_LOAD_FAIL',
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

export interface MetaLoadType {
  type: MetaActionTypes.META_LOAD;
  payload: string;
}
export interface MetaFailType {
  type: MetaActionTypes.META_LOAD_FAIL;
  payload: string;
}
export interface MetaSuccessType {
  type: MetaActionTypes.META_LOAD_SUCCESS;
  payload: Meta;
}

// export interface Data {
//   data: Dictionaries | Meta | null;
//   error: null | string;
//   status: RequestStatus;
// }

export type DictActionType = DictLoadType | DictFailType | DictSuccessType;
export type MetaActionType = MetaLoadType | MetaFailType | MetaSuccessType;


export const loadDicts = () => CreateAction(DictActionTypes.DICT_LOAD);
export const loadDictSuccess = (dictionaries: Dictionaries) => CreateAction(DictActionTypes.DICT_LOAD_SUCCESS, dictionaries);
export const loadDictFail = (error: string) => CreateAction(DictActionTypes.DICT_LOAD_FAIL, error);

export const loadMeta = () => CreateAction('META_LOAD');
export const loadMetaSuccess = (meta: Meta) => CreateAction(MetaActionTypes.META_LOAD_SUCCESS, meta);
export const loadMetaFail = (error: string) => CreateAction(MetaActionTypes.META_LOAD_FAIL, error);


export function* workerSaga (action: DictActionType | MetaActionType) {
  const isDict = yield action.type === DictActionTypes.DICT_LOAD;
  try {
    const result = yield call(isDict ? fetchDicts : fetchMeta);
    yield put(isDict ? loadDictSuccess(result) : loadMetaSuccess(result));
  } catch ({error: message}) {
    yield put(isDict ? loadDictFail(message) : loadMetaFail(message));
  }
}

export function* watcherSaga() {
  yield takeLatest(MetaActionTypes.META_LOAD, workerSaga);
  yield takeLatest(DictActionTypes.DICT_LOAD, workerSaga);
}

export interface DictsState {
  data: {
    dicts: Dictionaries | null;
    meta: Meta | null;
  };
  status: RequestStatus;
  error: string | null;
}

const initState = {
  data: {
    dicts: null,
    meta: null,
  },
  status: RequestStatus.STILL,
  error: null,
}

export function Reducer (state: DictsState = initState, action: DictActionType | MetaActionType): DictsState {
  const metaSuccess = action.type === MetaActionTypes.META_LOAD_SUCCESS;
  const dictSuccess = action.type === DictActionTypes.DICT_LOAD_SUCCESS;

  if (
    action.type === DictActionTypes.DICT_LOAD || action.type === MetaActionTypes.META_LOAD
  ) return {
    ...state,
    status: RequestStatus.LOADING,
  }

  if (metaSuccess || dictSuccess) return {
    ...state,
    status: RequestStatus.STILL,
    data: {
      ...state.data,
      dicts: dictSuccess ? action.payload as Dictionaries : state.data.dicts,
      meta: metaSuccess ? action.payload as Meta : state.data.meta,
    },
  }

  if (
    action.type === DictActionTypes.DICT_LOAD_FAIL ||
    action.type === MetaActionTypes.META_LOAD_FAIL
  ) return {
    ...state,
    status: RequestStatus.FAIL,
    error: action.payload
  }

  return state;
}