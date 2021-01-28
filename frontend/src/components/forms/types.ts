import {RequestStatus} from "../api/types";

export enum TokenActionTypes {
  FETCH_TOKEN = 'FETCH_TOKEN',
  FETCH_TOKEN_FAIL = 'FETCH_TOKEN_FAIL',
  FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS',
}

export interface Creds {
  username: string;
  password: string;
}
export interface Token {
  token: string;
  error: null | object | string;
  status: RequestStatus;
}

export interface FetchToken {
  type: TokenActionTypes.FETCH_TOKEN,
  payload: Creds;
}
export interface FetchTokenSuccess {
  type: TokenActionTypes.FETCH_TOKEN_SUCCESS;
  payload: Token;
}
export interface FetchTokenFail {
  type: TokenActionTypes.FETCH_TOKEN_FAIL;
  payload: Token;
}

export type FetchTokenAction = FetchToken | FetchTokenSuccess | FetchTokenFail;

export enum FormModes {
  ADD= 'ADD',
  EDIT = 'EDIT',
  HIDDEN = 'HIDDEN',
}