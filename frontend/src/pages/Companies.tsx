import React, {ComponentType} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
  CompaniesActionType, listDelete,
  listSelect,
  StateType as CompaniesState
} from './CompaniesDuck';

import ListComponent from '../components/list';
import companiesMock from '../mocks/companies';
import CompanyListItem from '../components/ListItems/CompanyItem';
import {CompanyType} from "../components/ListItems/types";
import {RootState} from "../store/rootReducer";

const Companies = (props: any) => {
  const {selectCompany, deleteCompany} = props;

  return (
    <>
      {/*TODO: fix type data*/}
      <ListComponent
        data={companiesMock as CompanyType[]}
        elementGen={CompanyListItem}
        elementClick={{selectCompany, deleteCompany}}
        title={'List of companies'}
        keyVal={'Company'}
      />
    </>
  );
}

const mapStateToProps = ({ CompaniesListReducer: { data, selected } }: RootState) => ({
  data,
  selected,
});

const mapDispatchToProps= (dispatch: Dispatch) => ({
  selectCompany: (id: string | number) => dispatch(listSelect(id)),
  deleteCompany: (id: string | number) => dispatch(listDelete(id)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Companies);