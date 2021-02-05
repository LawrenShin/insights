import {ListItemType} from "../components/ListItems/types";
import {CreateAction} from "../store/action";
import {RequestStatus} from "../components/api/types";
import {call, put, takeLatest} from "redux-saga/effects";
import {fetchList} from "./api";

// types
export enum ListActionTypes {
  LIST_LOAD = 'LIST_LOAD',
  LIST_SEARCH = 'LIST_SEARCH',
  LIST_SEARCH_CLEAR = 'LIST_SEARCH_CLEAR',
  LIST_LOAD_SUCCESS = 'LIST_LOAD_SUCCESS',
  LIST_LOAD_FAIL = 'LIST_LOAD_FAIL',

  LIST_DELETE = 'LIST_DELETE',
  LIST_SELECT = 'LIST_SELECT',
}

export interface ListRequestConfig {
  url: string;
  params?: string;
}

export interface ListSearchType {
  type: ListActionTypes.LIST_SEARCH;
  payload: ListRequestConfig;
}
export interface ListSearchClearType {
  type: ListActionTypes.LIST_SEARCH_CLEAR;
  payload: ListRequestConfig;
}


export interface ListLoadType {
  type: ListActionTypes.LIST_LOAD;
  payload: ListRequestConfig;
}
export interface ListLoadTypeSuccess {
  type: ListActionTypes.LIST_LOAD_SUCCESS;
  payload: ListItemType[];
}
export interface ListLoadTypeFail {
  type: ListActionTypes.LIST_LOAD_FAIL;
  payload: string;
}
export interface ListDeleteType {
  type: ListActionTypes.LIST_DELETE;
  payload: string | number;
}
export interface ListSelectType {
  type: ListActionTypes.LIST_SELECT;
  payload: string | number;
}

export interface ListStateType {
  data: Data;
  selected: string | number | null;
}
export interface Data {
  data: ListItemType[] | null;
  error: null | string;
  status: RequestStatus;
}

export type ListActionType = ListDeleteType | ListSelectType | ListLoadType | ListLoadTypeFail | ListLoadTypeSuccess | ListSearchClearType | ListSearchType;


//actions
export const listDelete = (id: string | number) => CreateAction(ListActionTypes.LIST_DELETE, id);
export const listSelect = (id: string | number) => CreateAction(ListActionTypes.LIST_SELECT, id);

export const loadList = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_LOAD, config);
export const loadSuccess = (list: ListItemType[]) => CreateAction(ListActionTypes.LIST_LOAD_SUCCESS, list);
export const loadListFail = (error: string) => CreateAction(ListActionTypes.LIST_LOAD_FAIL, error);


// sagas
export function* workerSaga( action: ListActionType ) {
  try {
    const list = yield call(fetchList, action.payload as ListRequestConfig);
    yield put(loadSuccess(list));
  } catch (error) {
    yield put(loadListFail(error.message));
  }
}
export function* watcherSaga() {
  yield takeLatest(ListActionTypes.LIST_LOAD, workerSaga);
  yield takeLatest(ListActionTypes.LIST_SEARCH, workerSaga);
  yield takeLatest(ListActionTypes.LIST_SEARCH_CLEAR, workerSaga);
}

// reducer
const initData = {
  data: null,
  status: RequestStatus.STILL,
  error: null,
}

const initState = {
  data: initData,
  selected: null,
}
// TODO: figure out how to make it reusable.
// now it seems to be reusable. To finish make reducer recognize it's related actions
export function InitReducer (listName: string) {
  return function Reducer(state: ListStateType = initState, action: ListActionType): ListStateType {
    const {type, payload} = action;

    if (type === ListActionTypes.LIST_SEARCH || type === ListActionTypes.LIST_SEARCH_CLEAR) {
      // didnt know what to do so casted
      const r = payload as ListRequestConfig;
      if (r.url === listName) return {
        ...state,
        data: {
          ...state.data,
          status: RequestStatus.LOADING,
        }
      }
    }

    if (type === ListActionTypes.LIST_LOAD) return {
      ...state,
      data: {
        ...state.data,
        status: RequestStatus.LOADING,
      }
    }
    if (type === ListActionTypes.LIST_LOAD_SUCCESS) return {
      ...state,
      data: {
        ...state.data,
        data: action.payload as ListItemType[],
        status: RequestStatus.STILL,
      }
    }
    if (type === ListActionTypes.LIST_LOAD_FAIL) return {
      ...state,
      data: {
        ...state.data,
        error: action.payload as string,
        status: RequestStatus.FAIL,
      }
    }

    if (type === ListActionTypes.LIST_SELECT) {
      return {...state, selected: payload as string | number}
    }
    if (type === ListActionTypes.LIST_DELETE) {
      return {
        // TODO: implement filter once u get the filtering field
        // data: state.data.filter()
        ...state,
        selected: null,
      }
    }

    return state;
  }
}