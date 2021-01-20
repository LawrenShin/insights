import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {Meta} from "../api/types";


interface Props {
  meta: Meta | null;
}

const CompanyForm = (props: Props) => {
  return (
    <></>
  );
}

const connector = connect(
  ({ DictsReducer: {data: {meta}} }: RootState) => ({
    meta,
  }),
);

export default connector(CompanyForm);
