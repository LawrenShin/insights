import {ListItemType} from "../components/ListItems/types";
import {CreateAction} from "../store/action";
import {RequestStatus} from "../components/api/types";
import {call, put, takeLatest} from "redux-saga/effects";
import {del, fetchList} from "./api";

// types
export enum ListActionTypes {
  LIST_LOAD = 'LIST_LOAD',
  LIST_LOAD_SUCCESS = 'LIST_LOAD_SUCCESS',
  LIST_LOAD_FAIL = 'LIST_LOAD_FAIL',

  LIST_SEARCH = 'LIST_SEARCH',
  LIST_SEARCH_CLEAR = 'LIST_SEARCH_CLEAR',

  LIST_DELETE = 'LIST_DELETE',
  LIST_DELETE_SUCCESS = 'LIST_DELETE_SUCCESS',
  LIST_DELETE_FAIL = 'LIST_DELETE_FAIL',

  LIST_SELECT = 'LIST_SELECT',
}

export interface ListRequestConfig {
  url: string;
  params?: string;
}

export interface ListSearchType {
  type: ListActionTypes.LIST_SEARCH;
  // payload: ListRequestConfig;
  payload: any;
}
export interface ListSearchClearType {
  type: ListActionTypes.LIST_SEARCH_CLEAR;
  // payload: ListRequestConfig;
  payload: any;
}
export interface ListDeleteFailType {
  type: ListActionTypes.LIST_DELETE_FAIL;
  // payload: ListRequestConfig;
  payload: any;
}export interface ListDeleteSuccessType {
  type: ListActionTypes.LIST_DELETE_SUCCESS;
  // payload: ListRequestConfig;
  payload: any;
}
export interface ListDeleteType {
  type: ListActionTypes.LIST_DELETE;
  // payload: ListRequestConfig;
  payload: any;
}
export interface ListLoadType {
  type: ListActionTypes.LIST_LOAD;
  // payload: ListRequestConfig;
  payload: any;
}
export interface ListLoadTypeSuccess {
  type: ListActionTypes.LIST_LOAD_SUCCESS;
  // payload: ListItemType[];
  payload: any;
}
export interface ListLoadTypeFail {
  type: ListActionTypes.LIST_LOAD_FAIL;
  // payload: {
  //   listName: string;
  //   error: string | number;
  // };
  payload: any;
}
export interface ListDeleteType {
  type: ListActionTypes.LIST_DELETE;
  // payload: string | number;
  payload: any;
}
export interface ListSelectType {
  type: ListActionTypes.LIST_SELECT;
  // payload: string | number;
  payload: any;
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

export type ListActionType = ListDeleteType | ListDeleteFailType | ListDeleteSuccessType | ListDeleteType | ListSelectType | ListLoadType | ListLoadTypeFail | ListLoadTypeSuccess | ListSearchClearType | ListSearchType;


//actions
// change params to differ list actions from one another
export const listDelete = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_DELETE, config);
// change params to differ list actions from one another
export const listSelect = (id: string | number) => CreateAction(ListActionTypes.LIST_SELECT, id);

export const loadList = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_LOAD, config);
export const loadSuccess = (data: { url: string, list: ListItemType[] }) => CreateAction(ListActionTypes.LIST_LOAD_SUCCESS, data);
export const loadListFail = (
  payload: {
    url: string,
    error: string | number,
  }) => CreateAction(ListActionTypes.LIST_LOAD_FAIL, payload);


// sagas
export function* getSaga( action: ListActionType ) {
  try {
    const list = yield call(fetchList, action.payload as ListRequestConfig);
    yield put(loadSuccess({url: action.payload?.url, list}));
  } catch (error) {
    if (action.payload.hasOwnProperty('url')) {
      yield put(loadListFail({
        url: action.payload.url,
        error: error.status === 403 ? error.status : error.message,
      }))
    }
  }
}
export function* deleteSaga(action: ListActionType) {
  try {
    const res = yield call(del, action.payload);
    yield console.log(res)
  } catch (error) {
    yield console.log(error)
  }
}
export function* watcherSaga() {
  yield takeLatest(ListActionTypes.LIST_LOAD, getSaga);
  yield takeLatest(ListActionTypes.LIST_SEARCH, getSaga);
  yield takeLatest(ListActionTypes.LIST_DELETE, deleteSaga);
  yield takeLatest(ListActionTypes.LIST_SEARCH_CLEAR, getSaga);
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

export function InitReducer (listName: string) {
  return function Reducer(state: ListStateType = initState, action: ListActionType): ListStateType {
    const {type, payload} = action;

    if (type === ListActionTypes.LIST_SEARCH || type === ListActionTypes.LIST_SEARCH_CLEAR) {
      // didnt know what to do so casted
      // const r = payload as ListRequestConfig;
      if (payload?.url === listName) return {
        ...state,
        data: {
          ...state.data,
          status: RequestStatus.LOADING,
        }
      }
    }

    if (type === ListActionTypes.LIST_LOAD)
      if (payload.url === listName) return {
      ...state,
      data: {
        ...state.data,
        status: RequestStatus.LOADING,
      }
    }
    if (type === ListActionTypes.LIST_LOAD_SUCCESS)
      if (payload.url === listName) return {
          ...state,
        data: {
          ...state.data,
          data: action.payload.list as ListItemType[],
          status: RequestStatus.STILL,
        }
      }

    if (type === ListActionTypes.LIST_LOAD_FAIL)
      if (payload.url === listName) return {
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

    if (type === ListActionTypes.LIST_DELETE_SUCCESS) {
      if (payload.url === listName) {
        return {
          // TODO: implement delete
          // data: state.data.filter()
          ...state,
          // selected: null,
        }
      }
    }

    return state;
  }
}