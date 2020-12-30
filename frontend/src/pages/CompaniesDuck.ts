import { ListItemType } from "../components/ListItems/types";
import {CreateAction} from "../store/action";
// TODO: remove mock
import companiesMock from '../mocks/companies';

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
  selected: ListItemType | null;
}

const InitState = {
  data: companiesMock,
  selected: null,
}

export function Reducer(state: StateType = InitState, action: CompaniesActionType) {

  const {type, payload} = action;

  if (type === CompaniesListActionTypes.LIST_SELECT) {
    return {...state, selected: payload}
  }
  if (type === CompaniesListActionTypes.LIST_DELETE) {
    return {
      // TODO: implement filter once u get the filtering field
      // data: state.data.filter()
      ...state,
      selected: null,
    }
  }

  return state;
}