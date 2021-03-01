import {ListItemType} from "../components/ListItems/types";
import {CreateAction} from "../store/action";
import {RequestStatus} from "../components/api/types";
import {call, put, takeLatest} from "redux-saga/effects";
import {del, fetchList} from "./api";
import {AnyFormActionTypes} from "./forms/anyForm/anyFormDuck";
import {TokenActionTypes} from "./forms/types";


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

  LIST_UPDATE = 'LIST_UPDATE',

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
export interface ListUpdateType {
  type: ListActionTypes.LIST_UPDATE;
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
export interface ListAnyFormUpdate {
  type: AnyFormActionTypes.ANY_FORM_UPDATE;
  payload: any;
}

export interface ListStateType {
  data: Data;
  selected: any;
}
export interface Data {
  data: Response | null;
  error: null | string;
  status: RequestStatus;
}
interface Response {
  companies?: any[] | [],
  pagination?: {
    pageIndex: number,
    pageSize: number,
    pageCount: number,
  }
}

export type ListActionType = ListUpdateType | ListAnyFormUpdate | ListDeleteType | ListDeleteFailType | ListDeleteSuccessType | ListSelectType | ListLoadType | ListLoadTypeFail | ListLoadTypeSuccess | ListSearchClearType | ListSearchType;


//actions
// change params to differ list actions from one another
export const listDelete = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_DELETE, config);
// change params to differ list actions from one another
export const listSelect = (id: string | number) => CreateAction(ListActionTypes.LIST_SELECT, id);

export const logout = () => CreateAction(TokenActionTypes.LOGOUT);

export const loadList = (config: ListRequestConfig) => CreateAction(ListActionTypes.LIST_LOAD, config);
export const loadSuccess = (data: { url: string, list: ListItemType[] }) => CreateAction(ListActionTypes.LIST_LOAD_SUCCESS, data);
export const loadListFail = (
  payload: {
    url: string,
    error: string | number,
  }) => CreateAction(ListActionTypes.LIST_LOAD_FAIL, payload);

// selectors
export const getPagination = (state: ListStateType) => state.data.data?.pagination;


// sagas
export function* getSaga( action: ListActionType ) {
  try {
    const list = yield call(fetchList, action.payload as ListRequestConfig);
    yield put(loadSuccess({url: action.payload?.url, list}));
  } catch (error) {
    if (action.payload.hasOwnProperty('url')) {
      if (error.message === '403') yield put(logout());

      if (error.status !== 403) {
        yield put(loadListFail({
          url: action.payload.url,
          error: error.message,
        }))
      }
    }
  }
}
export function* deleteSaga(action: ListActionType) {
  try {
    const res = yield call(del, action.payload);
    const resolved = yield Promise.resolve(res.json());
    yield put(CreateAction(
      ListActionTypes.LIST_DELETE_SUCCESS,
      {
        url: action.payload.url,
        id: resolved.id
      }));
  //  TODO: delete element from selected arr if person and call company by id to update it in companies list
  //  TODO: If company were deleted, clear selected and remove it from array of companies
  } catch (error) {
    yield console.log(error.message);
    yield put(CreateAction(ListActionTypes.LIST_DELETE_FAIL, error));
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
          data: action.payload.list,
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

    if (type === ListActionTypes.LIST_DELETE && listName === payload.url) {
      return {
        ...state,
        data: {
          ...state.data,
          status: RequestStatus.LOADING,
        },
        // selected: payload.url === 'people' ? payload.par
      }
    }

    // TODO: oh god need to unify in future
    // TODO: needs refactor
    if (type === ListActionTypes.LIST_DELETE_SUCCESS || type === ListActionTypes.LIST_UPDATE) {
      const isUpdate = type === ListActionTypes.LIST_UPDATE;
      const {data} = action.payload;

      if (payload.url === 'companies' && state.data.data?.companies) {
        return {
          ...state,
          data: {
            ...state.data,
            data: {
              ...state.data.data,
              companies: isUpdate ?
                // differ create from update by id
                +data.id === 0 ?
                  [...state.data.data.companies, data]
                  :
                  // running from a problem
                  // @ts-ignore
                  [...state.data.data.companies.map((company: any) => {
                    if (company.id === data.id) return {...company, ...data};
                    return company;
                  })]
              :
                state.data.data.companies.filter((company: any) => company.id !== payload.id),
            },
            status: RequestStatus.STILL,
          },
          // differ create from update by id
          selected: +data.id === 0 ? null : data,
        }
      }
      if (payload.url === 'people' && listName === 'companies') {
        const newPeople = isUpdate ?
          [...state.selected.people, action.payload.data]
          :
          state.selected.people.filter((person: any) => person.id !== payload.id);

        return {
          ...state,
          data: {
            ...state.data,
            data: {
              ...state.data.data,
              // @ts-ignore
              companies: state.data.data?.companies?.map((company: any) => {
                if (company.id === state.selected.id) return {...company, people: newPeople}
                return company;
              })
            },
          },
          selected: {
            ...state.selected,
            people: newPeople,
          }
        }
      }
    }

    return state;
  }
}