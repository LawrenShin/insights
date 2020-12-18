import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Input} from '../fields';

const SignInForm = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={(values => console.log(values))}
        validationSchema={Yup.object({
          login: Yup.string().required(),
          password: Yup.string().required(),
        })}
      >
        <Form>
          <Input
            label={'login'}
            name={'login'}
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