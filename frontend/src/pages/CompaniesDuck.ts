import { takeEvery, put } from "redux-saga/effects";
import * as tsActionCreator from 'typescript-action-creator';
import { ListItemType } from "../components/ListItems/types";

// types
export enum CompaniesListActionTypes {
  LIST_DELETE = 'LIST_DELETE',
  LIST_SELECT = 'LIST_SELECT',
}

export interface ListDeleteType {
  type: CompaniesListActionTypes.LIST_DELETE;
  payload: string | number;
}

export interface ListSelectType {
  type: CompaniesListActionTypes.LIST_SELECT;
  payload: string | number;
}

export type CompaniesActionType = ListDeleteType | ListSelectType;

//actions
export const listDelete = tsActionCreator.createAction(CompaniesListActionTypes.LIST_DELETE);
export const listSelect = tsActionCreator.createAction(CompaniesListActionTypes.LIST_SELECT, (id: string | number) => id);

// sagas
export function* ListSelectSaga (action: CompaniesActionType) {
  // yield put(listSelect)
}

export function* WatchListSelectSaga(){
  yield takeEvery('LIST_SELECT', ListSelectSaga);
}

// reducer
export interface StateType {
  data: ListItemType[];
  selected: string | number | null;
}

const InitState = {
  data: [],
  selected: null,
}

export function Reducer(state: StateType = InitState, action: CompaniesActionType) {
  if (tsActionCreator.isActionType(action, listSelect)) {
    console.log('im here');
    return {...state, selected: action.payload}
  };

  return state;
}