import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import useStyles from './styles';
import {MetaFieldTypes} from "./helpers/valuesInitter";
import {MetaMapType} from "./helpers/metaFlatMap";
import {Country, Dictionaries, DictItem} from "../../api/types";
import {renderField} from "./helpers/renderFields";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Tooltip} from "@material-ui/core";

export interface InitialValuesType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
}

interface Props {
  title: string;
  entity: any;
  dicts: Dictionaries;
  initialValues: InitialValuesType;
  schema: Yup.ObjectSchema<any>;
  metaTypesMap: MetaMapType;
  handleSubmit: (values: InitialValuesType) => void;
  handleClose: () => void;
}


// TODO: should consist of 3 functions. 1 brings inits, 2 Validation schema, 3d form itself. This will be the bag for all
const AnyForm = ({
  title,
  entity,
  dicts,
  schema,
  handleClose,
  metaTypesMap,
  handleSubmit,
  initialValues,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={`${classes.borderBottom} ${classes.closeIconContainer}`}>
        <div><h1 className={classes.title}>{title}</h1></div>
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
          {({ initialValues }) => <Form>
            {console.log(initialValues, 'fff')}
            {
              Object.keys(entity).map((key) => {
                if (entity[key].fieldType !== MetaFieldTypes.NestedEntity) {
                  return renderField(key, initialValues[key], metaTypesMap, dicts, classes);
                }

                return <>
                  <h4>{entity[key].displayName}</h4>
                  <div className={classes.subEntity}>
                    {
                      Object.keys(entity[key].meta).map(
                        (key) => renderField(key, initialValues[key], metaTypesMap, dicts, classes)
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
              <button type="submit">Submit</button>
            </div>
          </Form>}
        </Formik>
      </div>
    </div>
  );
}

export default AnyForm;
