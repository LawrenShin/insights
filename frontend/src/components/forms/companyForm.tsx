import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Meta, MetaEntity} from "../api/types";
import AnyForm from "./anyForm";
import Yup from 'yup';
import {valuesInitter} from "./anyForm/valuesInitter";


const companySchema = {};
const initValues = {};


interface Props {
  meta: Meta | null;
}

const CompanyForm = ({meta}: Props) => {
  const entityCompany = meta === null ? meta : meta.filter((entity) => entity.entityName === 'company')[0];

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (entityCompany) setInitialValues(valuesInitter(entityCompany, initValues));
  }, []);

  return (
    <>
      {
        entityCompany ?
          <AnyForm
            entity={entityCompany}
            initialValues={initialValues}
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
