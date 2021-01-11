import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Input} from '../fields';
import {fetchToken} from '../api/index';

const SignInForm = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values =>   fetchToken('', values))}
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
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;