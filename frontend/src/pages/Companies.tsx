import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
  listDelete,
  listSelect,
} from './CompaniesDuck';

import Content from "../components/content";
import ListComponent from '../components/list';
import CompanyListItem from '../components/ListItems/CompanyItem';
import {RootState} from "../store/rootReducer";
import {Box} from "@material-ui/core";


const Companies = (props: any) => {
  const {
    data: companiesList, selected: company,
    selectCompany, deleteCompany,
  } = props;

  return (
    <Box display={'flex'} height={'fit-content'} minHeight={'100vh'}>
      <ListComponent
        data={companiesList}
        elementGen={CompanyListItem}
        elementClick={{selectCompany, deleteCompany}}
        title={'List of companies'}
        keyVal={'Company'}
      />
      {company && <Content title={'Company details'} data={company} />}
    </Box>
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