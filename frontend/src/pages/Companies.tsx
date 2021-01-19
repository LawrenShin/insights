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
import TablePagination from '@material-ui/core/TablePagination';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      background: 'white',
      width: '32%',
      borderTop: '1px solid #AAA',
      '& .MuiTablePagination-spacer': {
        display: 'none',
      },
      '& .MuiTablePagination-selectRoot': {
        marginRight: '5px',
      },
      '& .MuiTablePagination-actions': {
        position: 'absolute',
        right: 0,
      },
      '& .MuiTablePagination-actions > button': {
        padding: 0,
      }
    },
  }))


const Companies = (props: any) => {
  const {
    data: companiesData, selected: company,
    dicts,
    selectCompany, deleteCompany, loadList, loadDicts
  } = props;

  const classes = useStyles();
  const [pageSize, setPageSize] = useState<number>(companiesData?.data?.pagination.pageSize | 10);
  const [page, setPage] = useState<number>(companiesData?.data?.pagination.page | 1);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    loadList({
      url: 'companies',
      params: `page_size=${pageSize}&page_index=${page}`,
    });
  }, [page]);

  useEffect(() => {
    if (companiesData.data === null && companiesData.status === RequestStatus.STILL) loadList({
      url: 'companies',
      params: `page_size=${pageSize}&page_index=${page}`,
    });
    if (dicts.data === null && dicts.status === RequestStatus.STILL)
      loadDicts();
  }, []);

  return (
    <Box display={'flex'} height={'fit-content'} minHeight={'100vh'}>
      <ListComponent
        data={companiesData.data?.companies}
        status={companiesData.status}
        elementGen={CompanyListItem}
        elementClick={{selectCompany, deleteCompany}}
        title={'List of companies'}
        keyVal={'Company'}
        pagination={() => companiesData?.data?.pagination && <TablePagination
          className={classes.root}
          component="div"
          count={companiesData?.data?.pagination.pageCount * companiesData?.data?.pagination.pageSize}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={pageSize}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
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