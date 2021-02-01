import React, {useEffect, useState, useMemo} from 'react';
import {connect} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Dictionaries, Meta} from "../api/types";
import AnyForm from "./anyForm";
import {MetaFieldTypes, valuesInitter} from "./anyForm/helpers/valuesInitter";
import {schemaInitter} from "./anyForm/helpers/schemaInitter";
import {metaFlatMap} from "./anyForm/helpers/metaFlatMap";
import * as Yup from 'yup';
import {Dispatch} from "redux";
import {CreateAction} from "../../store/action";
import {AnyFormActionPayload, AnyFormActionTypes} from "./anyForm/anyFormDuck";

interface DispatchProps {
  initForm: (payload: AnyFormActionPayload) => void;
  submitForm: (payload: AnyFormActionPayload) => void;
}

interface OwnProps {
  selectedCompany: any;
  handleClose: () => void;
}

interface Props extends OwnProps, DispatchProps{
  dicts: Dictionaries | null;
  meta: Meta | null;
}
// TODO:NOTES: rly unnecessary and ugly. Cas formik sometimes doesn't pass full initialsValues here.
// also converts flat json back to what it is like on the backend.
const handleSubmit = (values: any, meta: any, dispatcher?: any) => {
  let filledMetaCopy = {};
  Object.keys(meta).forEach((key, index) => {
    const {
      fieldType,
    } = meta[key];

      if (fieldType !== MetaFieldTypes.NestedEntity) {
        filledMetaCopy = {...filledMetaCopy, [key]: values[key]};
      } else {
        filledMetaCopy = {...filledMetaCopy, [key]: {...handleSubmit(values, meta[key].meta)}};
      }
  })
  return filledMetaCopy;
}

const CompanyForm = ({
  meta, dicts, selectedCompany,
  handleClose, initForm, submitForm,
}: Props) => {
  const entityCompany = meta?.company;

  const [initialValues, setInitialValues] = useState({});
  const [companySchema, setCompanySchema] = useState({});
  const [metaTypesMap, setMetaMap] = useState(new Map());

  useEffect(() => {
    initForm({formName: 'company', error: null});
    if (entityCompany) {
      setInitialValues(valuesInitter(entityCompany, initialValues, selectedCompany));
      setCompanySchema(schemaInitter(entityCompany, companySchema));
      setMetaMap(metaFlatMap(entityCompany, metaTypesMap));
    }
  }, []);

  return (
    <>
      {
        (entityCompany && dicts) ?
          <AnyForm
            handleClose={handleClose}
            formName={'company'}
            entity={entityCompany}
            dicts={dicts}

            initialValues={initialValues}
            schema={Yup.object(companySchema)}
            metaTypesMap={metaTypesMap}
            // TODO: wire up redux
            handleSubmit={(values: any) => {
              console.log(values);
              // submitForm({
              //   formName: 'company',
              //   data: handleSubmit(values, entityCompany),
              // });
            }}
          />
        :
          <span>No entity were found</span>
      }
    </>
  );
}

// TODO: ask Stan to remove entity name repetition in one's field's names.
const connector = connect(
  ({ DictsReducer: {data: {meta, dicts}} }: RootState) => ({
    meta,
    dicts,
  }),
  (dispatch: Dispatch) => ({
    initForm: (payload: AnyFormActionPayload) => dispatch(CreateAction(AnyFormActionTypes.ANY_FORM_INIT, payload)),
    submitForm: (payload: AnyFormActionPayload) => dispatch(CreateAction(AnyFormActionTypes.ANY_FORM_SUBMIT, payload)),
  })
);

export default connector(CompanyForm);
