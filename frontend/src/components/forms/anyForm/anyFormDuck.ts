import {RequestStatus} from "../../api/types";
import {put, takeEvery} from "redux-saga/effects";
import {call} from "typed-redux-saga";
import {anyFormApi} from "../../api";
import {CreateAction} from "../../../store/action";
import {ListActionTypes} from "../../listDuck";


export interface AnyFormState {
  forms: AnyFormType[];
}
export interface AnyFormType {
  formName: string;
  error?: string | null;
  status: RequestStatus;
}

export enum AnyFormActionTypes {
  ANY_FORM_INIT = 'ANY_FORM_INIT',
  ANY_FORM_SUBMIT = 'ANY_FORM_SUBMIT',
  ANY_FORM_FAIL = 'ANY_FORM_FAIL',
  ANY_FORM_SUCCESS = 'ANY_FORM_SUCCESS',
  ANY_FORM_UPDATE = 'ANY_FORM_UPDATE',
}
export interface AnyFormActionPayload {
  formName: string;
  error?: string | null;
  data?: any;
}
export interface SubmitAnyFormAction {
  type: AnyFormActionTypes;
  payload: AnyFormActionPayload;
}

const initState = {
  forms: [],
}


function* workerSaga(action: SubmitAnyFormAction) {
  try {
    const res = yield* call(anyFormApi, action.payload.data, action.payload.formName);
    // const resolved = yield Promise.resolve(res.json());
    yield put(
      CreateAction(
        AnyFormActionTypes.ANY_FORM_SUCCESS,
        { formName: action.payload.formName }
      )
    );
    // Confusing updates
    yield put(
      CreateAction(
        ListActionTypes.LIST_UPDATE,
        {
          url: action.payload.formName === 'person' ? 'people' : 'companies',
          data: {...res},
        }
      )
    )
  } catch (error) {
    yield put(
      CreateAction(AnyFormActionTypes.ANY_FORM_FAIL, {
        formName: action.payload.formName,
        error: error.message,
      }));
  }
}

export function* watcherSaga() {
  yield takeEvery(AnyFormActionTypes.ANY_FORM_SUBMIT, workerSaga);
}


export function Reducer (state: AnyFormState = initState, action: SubmitAnyFormAction): AnyFormState {
  const {payload} = action;

  if (action.type === AnyFormActionTypes.ANY_FORM_INIT) {
    return {
      ...state,
      forms: [
        ...state.forms.filter(({formName}) => formName !== payload.formName),
        {
          ...action.payload,
          status: RequestStatus.STILL
        }
      ],
    }
  }

  if (action.type === AnyFormActionTypes.ANY_FORM_SUBMIT) {
    return {
      ...state,
      forms: state.forms.map((form) =>
        form.formName === payload.formName ? {...form, status: RequestStatus.LOADING} : form),
    }
  }

  if (action.type === AnyFormActionTypes.ANY_FORM_FAIL) {
    return {
      ...state,
      forms: state.forms.map((form) =>
        form.formName === payload.formName ? {
        ...form,
          status: RequestStatus.FAIL,
          error: payload.error,
      } : form),
    }
  }

  if (action.type === AnyFormActionTypes.ANY_FORM_SUCCESS) {
    return {
      ...state,
      forms: state.forms.map((form) =>
        form.formName === payload.formName ? {
          ...form,
          status: RequestStatus.STILL,
          error: null,
        } : form),
    }
  }

    return state;
}
