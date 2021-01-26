import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import * as Fields from '../../fields';
import {MetaFieldTypes} from "./valuesInitter";


export interface InitialValuesType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
}

interface Props {
  title: string;
  entity: any;
  initialValues: InitialValuesType;
  schema: Yup.ObjectSchema<any>;
  metaTypesMap: Map<string, string>;
  handleSubmit: (values: InitialValuesType) => void;
}
// TODO: create fields on fly
// number | string - input
// boolean - checkbox
// array select, but also needs dictionary for this
const renderField = (key: string, val: any, metaTypesMap: Map<string, string>, entity: any): JSX.Element => {
  // console.log(key, val, metaTypesMap.get(key), 'renderField');
  if (key !== 'id') {
    if (metaTypesMap.get(key) === 'number') {
      console.log()
      return <Fields.Input
        label={key}
        name={key}
        type={'number'}
        // value={val}
      />
    }
    return <></>;
  }
  return <></>;
}

// TODO: should consist of 3 functions. 1 brings inits, 2 Validation schema, 3d form itself. This will be the bag for all
const AnyForm = ({
  title,
  entity,
  schema,
  metaTypesMap,
  handleSubmit,
  initialValues,
}: Props) => {

  return (
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        <Form>
          {Object.keys(initialValues).map(
            (key) => renderField(key, initialValues[key], metaTypesMap, entity)
          )}
        </Form>
      </Formik>
    </>
  );
}

export default AnyForm;
