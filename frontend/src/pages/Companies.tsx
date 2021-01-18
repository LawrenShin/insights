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
import {loadDicts} from "../components/api/dictsDuck";
import {RequestStatus} from "../components/api/types";

const Companies = (props: any) => {
  const {
    data: companiesData, selected: company,
    dicts,
    selectCompany, deleteCompany, loadList, loadDicts
  } = props;

  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {

    if (companiesData.data === null && companiesData.status === RequestStatus.STILL) loadList({
      url: 'companies',
      params: `page_size=${pageSize}&page_index=${page}`,
    });
    if (dicts.data === null && dicts.status === RequestStatus.STILL)
      loadDicts();

    }, [companiesData.data, page, dicts]);

  return (
    <Box display={'flex'} height={'fit-content'} minHeight={'100vh'}>
      <ListComponent
        data={companiesData.data}
        status={companiesData.status}
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


const mapStateToProps = (
  {
    CompaniesListReducer: {
      data,
      selected
    },
    DictsReducer: dicts,
  }: RootState
) => ({
  data,
  dicts,
  selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadList: (config: ListRequestConfig) => dispatch(loadList(config)),
  loadDicts: () => dispatch(loadDicts()),

  selectCompany: (id: string | number) => dispatch(listSelect(id)),
  deleteCompany: (id: string | number) => dispatch(listDelete(id)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Companies);