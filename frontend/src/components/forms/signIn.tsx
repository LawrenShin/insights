import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Input} from '../fields';
import {Dispatch} from "redux";
import {Creds, TokenActionTypes} from "./types";
import {CreateAction} from "../../store/action";
import {RootState} from "../../store/rootReducer";
import {RequestStatus} from "../api/types";
import Loader from "../loader";

interface StateProps {
  status: RequestStatus;
}

interface Props extends StateProps{
  fetchToken: (creds: Creds) => void;
}

const SignInForm = (props: Props) => {
  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={values => props.fetchToken(values)}
        validationSchema={Yup.object({
          username: Yup.string().required(),
          password: Yup.string().required(),
        })}
      >
        <Form>
          <Input
            label={'username'}
            name={'username'}
            type={'text'}
          />
          <Input
            label={'password'}
            name={'password'}
            type={'text'}
          />
          <div>
            {props.status !== RequestStatus.LOADING ? <button type="submit">Submit</button> : <Loader />}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const connector = connect(
  ({ SignInReducer: { status } }: RootState) => ({
    status,
  }),
  (dispatch: Dispatch) => ({
    fetchToken: (creds: Creds) => dispatch(CreateAction(TokenActionTypes.FETCH_TOKEN, creds)),
  })
)

export default connector(SignInForm);