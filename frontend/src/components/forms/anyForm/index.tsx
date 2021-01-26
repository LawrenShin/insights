import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import * as Fields from '../../fields';
import useStyles from './styles';
import {MetaFieldTypes} from "./valuesInitter";
import {MetaMapType} from "./metaFlatMap";


export interface InitialValuesType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
}

interface Props {
  title: string;
  entity: any;
  initialValues: InitialValuesType;
  schema: Yup.ObjectSchema<any>;
  metaTypesMap: MetaMapType;
  handleSubmit: (values: InitialValuesType) => void;
}

// TODO: create fields on fly
// number | string - input
// boolean - checkbox
// array select, but also needs dictionary for this
const renderField = (
  key: string,
  val: any,
  metaTypesMap: MetaMapType,
  entity: any,
  classes?: any
): JSX.Element => {
  if (key !== 'id') {
    if (metaTypesMap.get(key)?.type === MetaFieldTypes.Number) {
      return <Fields.Input
        className={classes ? classes.input : null}
        label={metaTypesMap.get(key)?.displayName}
        name={key}
        type={'number'}
      />
    }

    if (metaTypesMap.get(key)?.type === MetaFieldTypes.Boolean) {
      return <Fields.Checkbox
        className={classes ? classes.checkbox : null}
        name={key}
        type={'checkbox'}
      >
        <label htmlFor={key} className={classes.checkBoxLabel}>{metaTypesMap.get(key)?.displayName}</label>
      </Fields.Checkbox>
    }

    if (metaTypesMap.get(key)?.type === MetaFieldTypes.String) {
      return <Fields.Input
        className={classes ? classes.input : null}
        label={metaTypesMap.get(key)?.displayName}
        name={key}
        type={'text'}
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.title}>{title}</h1>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleSubmit(values)}
          validationSchema={schema}
        >
          <Form>
            {
              Object.keys(initialValues).map(
                (key) => renderField(key, initialValues[key], metaTypesMap, entity, classes)
              )
            }
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AnyForm;
