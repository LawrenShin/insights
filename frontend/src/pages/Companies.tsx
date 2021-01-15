import React, {useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
  listDelete, ListRequestConfig,
  listSelect, loadList,
} from '../components/listDuck';

import Content from "../components/content";
import ListComponent from '../components/list';
import CompanyListItem from '../components/ListItems/CompanyItem';
import {RootState} from "../store/rootReducer";
import {Box} from "@material-ui/core";
import CompanyForm from "../components/forms/companyForm";


const Companies = (props: any) => {
  const {
    data: companiesData, selected: company,
    selectCompany, deleteCompany, loadList,
  } = props;

  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (companiesData.data === null) loadList({
      url: 'companies',
      params: `page_size=${pageSize}&page_index=${page}`,
    });
  }, [companiesData.data, page]);

  return (
    <Box display={'flex'} height={'fit-content'} minHeight={'100vh'}>
      <ListComponent
        data={companiesData.data}
        elementGen={CompanyListItem}
        elementClick={{selectCompany, deleteCompany}}
        title={'List of companies'}
        keyVal={'Company'}
      />

      {company && <Content title={'Company details'} data={company} />}

      <CompanyForm />
    </Box>
  );
}


const mapStateToProps = ({ CompaniesListReducer: { data, selected } }: RootState) => ({
  data,
  selected,
});

const mapDispatchToProps= (dispatch: Dispatch) => ({
  loadList: (config: ListRequestConfig) => dispatch(loadList(config)),
  selectCompany: (id: string | number) => dispatch(listSelect(id)),
  deleteCompany: (id: string | number) => dispatch(listDelete(id)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Companies);