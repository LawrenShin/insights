import { ListItemType } from "../components/ListItems/types";
import {CreateAction} from "../store/action";

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
export const listDelete = (id: string | number) => CreateAction(CompaniesListActionTypes.LIST_DELETE, id);
export const listSelect = (id: string | number) => CreateAction(CompaniesListActionTypes.LIST_SELECT, id);

// sagas

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
  const {type, payload} = action;
  if (type === CompaniesListActionTypes.LIST_SELECT) {
    return {...state, selected: payload}
  }

  return state;
}