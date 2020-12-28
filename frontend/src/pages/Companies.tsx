import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
  CompaniesActionType,
  listSelect,
  StateType as CompaniesState
} from './CompaniesDuck';

import ListComponent from '../components/list';
import companiesMock from '../mocks/companies';
import CompanyListItem from '../components/ListItems/CompanyItem';

const Companies = () => {

  return (
    <>
      {/*TODO: fix type data*/}
      <ListComponent
        data={companiesMock as any}
        elementGen={CompanyListItem}
        title={'List of companies'}
        keyVal={'Company'}
      />
    </>
  );
}

const mapStateToProps = ({data, selected}: CompaniesState) => ({
  data,
  selected,
});

const mapDispatchToProps= (dispatch: Dispatch<CompaniesActionType>) => ({
  selectCompany: (id: string | number) => dispatch(listSelect(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);