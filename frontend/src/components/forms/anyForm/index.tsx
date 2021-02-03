import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import useStyles from './styles';
import {MetaFieldTypes} from "./helpers/valuesInitter";
import {MetaMapType} from "./helpers/metaFlatMap";
import {Dictionaries, RequestStatus} from "../../api/types";
import {renderField} from "./helpers/renderFields";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Tooltip} from "@material-ui/core";
import {RootState} from "../../../store/rootReducer";
import {AnyFormType} from "./anyFormDuck";
import Loader from '../../loader';

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
  initialValues: InitialValuesType;
  metaTypesMap: MetaMapType;
  handleSubmit: (values: InitialValuesType) => void;
  handleClose: () => void;
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={`${classes.borderBottom} ${classes.closeIconContainer}`}>
        <div className={classes.formTitleControlsContainer}>
          <h1 className={classes.title}>
            {`${formName.replace(formName.charAt(0), formName.charAt(0).toUpperCase())} form`}
          </h1>
          <button
            className={tab === Tabs.FIELDS ? classes.selectedTab : ''}
            onClick={() => setTab(Tabs.FIELDS)}>
            Fields
          </button>
          <button
            className={tab === Tabs.ARRAYS ? classes.selectedTab : ''}
            onClick={() => setTab(Tabs.ARRAYS)}>
            Array fields
          </button>
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
          {({ initialValues, values }) => <Form>
            {
              Object.keys(entity).map((key) => {
                const fieldTypeIsNested = entity[key].fieldType === MetaFieldTypes.NestedEntity;
                const fieldTypeIsArr = entity[key].fieldType.toLowerCase() === MetaFieldTypes.Array;
                const renderArrRelated = fieldTypeIsArr && tab === Tabs.ARRAYS;

                if (!fieldTypeIsNested && tab !== Tabs.ARRAYS) {
                  return <>
                    {/*{renderArrRelated && <h4>{entity[key].displayName}</h4>}*/}
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

                if (fieldTypeIsNested && tab === Tabs.FIELDS) return <>
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

                if (renderArrRelated) return <>
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
              >Cancel</button>
              {
                form.status === RequestStatus.LOADING ?
                  <Loader styles={classes.loader} /> : <button type="submit">Submit</button>
              }
            </div>
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
