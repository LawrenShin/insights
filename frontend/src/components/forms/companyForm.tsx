import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Meta} from "../api/types";
import AnyForm from "./anyForm";
import {valuesInitter} from "./anyForm/valuesInitter";
import {schemaInitter} from "./anyForm/schemaInitter";
import {metaFlatMap} from "./anyForm/metaFlatMap";
import * as Yup from 'yup';

interface Props {
  meta: Meta | null;
}

const CompanyForm = ({meta}: Props) => {
  const entityCompany = meta?.company;

  const [initialValues, setInitialValues] = useState({});
  const [companySchema, setCompanySchema] = useState({});
  const [metaTypesMap, setMetaMap] = useState(new Map());

  useEffect(() => {
    if (entityCompany) {
      setInitialValues(valuesInitter(entityCompany, initialValues));
      setCompanySchema(schemaInitter(entityCompany, companySchema));
      setMetaMap(metaFlatMap(entityCompany, metaTypesMap));
    }
  }, []);

  return (
    <>
      {
        entityCompany ?
          <AnyForm
            title={'Company form'}
            entity={entityCompany}

            initialValues={initialValues}
            schema={Yup.object(companySchema)}
            metaTypesMap={metaTypesMap}

            handleSubmit={(values: any) => console.log(values)}
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
);

export default connector(CompanyForm);
