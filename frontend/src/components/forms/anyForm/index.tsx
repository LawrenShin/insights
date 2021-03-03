import React, {useState} from 'react';
import {connect} from 'react-redux';
import {FieldArray, Form, Formik} from "formik";
import * as Yup from 'yup';
import useStyles from './styles';
import {MetaFieldTypes} from "./helpers/valuesInitter";
import {MetaMapType} from "./helpers/metaFlatMap";
import {Country, Dictionaries, DictItem, RequestStatus} from "../../api/types";
import {renderField} from "./helpers/renderFields";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Tooltip} from "@material-ui/core";
import {RootState} from "../../../store/rootReducer";
import {AnyFormType} from "./anyFormDuck";
import Loader from '../../loader';
import {Select} from "../../fields";

export interface InitialValuesType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
}

export enum Tabs {
  FIELDS = 'FIELDS',
  ARRAYS = 'ARRAYS',
}

interface StateProps {
  form: AnyFormType;
}

interface Props {
  dicts: Dictionaries;
  schema: Yup.ObjectSchema<any>;
  entity: any;
  formName: string;
  initialValues: any;
  metaTypesMap: MetaMapType;
  handleSubmit: (values: InitialValuesType) => void;
  handleClose?: () => void;
}


// TODO: should consist of 3 functions. 1 brings inits, 2 Validation schema, 3d form itself. This will be the bag for all
const AnyForm = ({
  form,
  entity,
  dicts,
  schema,
  formName,
  handleClose,
  metaTypesMap,
  handleSubmit,
  initialValues,
}: Props & StateProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.FIELDS);
  // const [forArrays, setForArrays] = useState({});
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={`${classes.borderBottom} ${classes.closeIconContainer}`}>
        <div className={classes.formTitleControlsContainer}>
          <h1 className={classes.title}>
            {`${formName.replace(formName.charAt(0), formName.charAt(0).toUpperCase())} form`}
          </h1>
        </div>
        <div className={classes.closeIcon}>
          <Tooltip
            title="Close"
            aria-label="Close"
            onClick={handleClose}
          >
            <HighlightOffIcon fontSize={'large'} />
          </Tooltip>
        </div>
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={values => handleSubmit(values)}
          validationSchema={schema}
        >
          {({ initialValues, values, setValues }) => <Form>
            {
              Object.keys(entity).map((key) => {
                const fieldTypeIsNested = entity[key].fieldType === MetaFieldTypes.NestedEntity;
                const fieldTypeIsArr = entity[key].fieldType.toLowerCase() === MetaFieldTypes.Array;
                // const renderArrRelated = fieldTypeIsArr && tab === Tabs.ARRAYS;

                {/* TODO: didnt make it flexible, works only with nationalities of person*/}
                if (fieldTypeIsArr && entity?.nationalities) return <>
                  <h4>{entity.nationalities.displayName}</h4>
                  {
                    <FieldArray
                      name={key}
                      render={arrayHelpers => (
                        <div className={classes.array}>
                          {values[key]?.map((nationality: any, index: number) => (
                            <div key={index}>
                              <Select
                                name={`country_${index}`}
                                value={values[key][index].country}
                                onChange={(e) => {
                                  values = {
                                    ...values,
                                    nationalities: [...values.nationalities.map((nationality: any, i: number) =>
                                      index === i ? {country: e.target.value} : nationality
                                    )]
                                  };
                                  setValues(values);
                                }}
                              >
                                {dicts['country']?.map(
                                  (option: Country) => <option value={option.id}>{option.name}</option>
                                )}
                              </Select>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push({country: 0})}
                          >
                            add
                          </button>
                        </div>
                      )}
                    />
                  }
                  </>

                if (!fieldTypeIsNested) {
                  return <>
                    {renderField(
                      key,
                      initialValues[key],
                      metaTypesMap,
                      dicts,
                      values,
                      tab,
                      classes,
                    )}
                  </>
                }

                if (fieldTypeIsNested) return <>
                  <h4>{entity[key].displayName}</h4>
                  <div className={classes.subEntity}>
                    {
                      Object.keys(entity[key].meta).map(
                        (innerKey) => {
                          return renderField(
                            innerKey,
                            initialValues[innerKey],
                            metaTypesMap,
                            dicts,
                            values,
                            tab,
                            classes,
                          )
                        }
                      )
                    }
                  </div>
                </>
              })
            }
            <div className={classes.buttonsContainer}>
              <button
                type="reset"
                onClick={handleClose}
              >Close</button>
              {
                form.status === RequestStatus.LOADING ?
                  <Loader styles={classes.loader} /> : <button type="submit">Submit</button>
              }
            </div>
            {form.status === RequestStatus.FAIL && <div className={`error ${classes.error}`}>{form.error}</div>}
          </Form>}
        </Formik>
      </div>
    </div>
  );
}

const connector = connect(
  ({AnyFormReducer: {forms}}: RootState, ownProps: Props): StateProps => ({
    form: {...forms.filter((form) => form.formName === ownProps.formName)[0]}
  }),
);

export default connector(AnyForm);
