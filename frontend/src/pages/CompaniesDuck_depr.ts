import { ListItemType } from "../components/ListItems/types";
import {CreateAction} from "../store/action";
import {RequestStatus} from "../components/api/types";
import {call, put, takeLatest} from "redux-saga/effects";

// types
export enum ListActionTypes {
  LIST_LOAD = 'LIST_LOAD',
  LIST_LOAD_SUCCESS = 'LIST_LOAD_SUCCESS',
  LIST_LOAD_FAIL = 'LIST_LOAD_FAIL',

  LIST_DELETE = 'LIST_DELETE',
  LIST_SELECT = 'LIST_SELECT',
}

export interface ListRequestConfig {
  url: string;
  params?: string;
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

export interface StateType {
  data: Data;
  selected: ListItemType | null;
}
export interface Data {
  data: ListItemType[] | null;
  error: null | string;
  status: RequestStatus;
}

export type ListActionType = ListDeleteType | ListSelectType | ListLoadType | ListLoadTypeFail | ListLoadTypeSuccess;


//actions
export const listDelete = (id: string | number) => CreateAction(ListActionTypes.LIST_DELETE, id);
export const listSelect = (id: string | number) => CreateAction(ListActionTypes.LIST_SELECT, id);

export const loadList = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_LOAD, config);
export const loadSuccess = (list: ListItemType[]) => CreateAction(ListActionTypes.LIST_LOAD, list);
export const loadListFail = (error: string) => CreateAction(ListActionTypes.LIST_LOAD, error);


// sagas
export function* workerSaga(action: ListActionType) {
  try {
    const list = yield call(loadList, action.payload as ListRequestConfig);
    yield put(loadSuccess(list));
  } catch (error) {
    yield put(loadListFail(error.message));
  }
}
export function* watcherSaga() {
  yield takeLatest(ListActionTypes.LIST_LOAD, workerSaga);
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

export function Reducer(state: StateType = initState, action: ListActionType) {

  const {type, payload} = action;

  if (type === ListActionTypes.LIST_SELECT) {
    return {...state, selected: payload}
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