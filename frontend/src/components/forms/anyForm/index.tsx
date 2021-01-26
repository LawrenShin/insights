import React from 'react';
import {Form, Formik} from "formik";
import * as Fields from '../../fields';
import {MetaFieldTypes} from "./valuesInitter";


export interface InitialValuesType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
}

interface Props<S> {
  title: string;
  entity: any;
  initialValues: InitialValuesType;
  schema: S;
  handleSubmit: (values: InitialValuesType) => void;
}
// TODO: create fields on fly
// number | string - input
// boolean - checkbox
// array select, but also needs dictionary for this
const renderField = (key: string, val: any, entity: any): JSX.Element => {
  console.log(key, val, 'renderField');
  return <></>;
}

// TODO: should consist of 3 functions. 1 brings inits, 2 Validation schema, 3d form itself. This will be the bag for all
const AnyForm = <S extends {}>
({
    entity,
    title,
    initialValues,
    schema,
    handleSubmit,
}: Props<S>) => {
  return (
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        <Form>
          {
            // Object.keys(initialValues).map(
            //   (key) => renderField(key, initialValues[key], entity)
            // )
          }
        </Form>
      </Formik>
    </>
  );
}

export default AnyForm;
