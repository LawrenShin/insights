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
import {loadDicts, loadMeta} from "../components/api/dictsDuck";
import {RequestStatus} from "../components/api/types";
import TablePagination from '@material-ui/core/TablePagination';
import {companiesPageStyles} from './styles';


const Companies = (props: any) => {
  const {
    data: companiesData, selected: company,
    meta, dicts, dictsMetaStatus, dictsMetaError,
    selectCompany, deleteCompany, loadList, loadDicts, loadMeta
  } = props;

  const classes = companiesPageStyles();
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
    if (dictsMetaStatus === RequestStatus.STILL) {
      if (dicts === null) loadDicts();
      if (meta === null) loadMeta();
    }
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
        pagination={
          () => companiesData?.data?.pagination && <TablePagination
            className={classes.root}
            component="div"
            count={companiesData?.data?.pagination.pageCount * companiesData?.data?.pagination.pageSize}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={pageSize}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 30, 50, 100, 200, 300]}
          />
        }
      />

      {company && <Content title={'Company details'} data={company} />}

      {meta && <CompanyForm/>}
    </Box>
  );
}


const mapStateToProps = (
  {
    CompaniesListReducer: {
      data,
      selected
    },
    DictsReducer: {
      data: {
        dicts,
        meta,
      },
      status: dictsMetaStatus,
      error: dictsMetaError,
    },
  }: RootState
) => ({
  data,
  meta,
  dicts,
  dictsMetaStatus,
  dictsMetaError,
  selected,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadList: (config: ListRequestConfig) => dispatch(loadList(config)),
  loadDicts: () => dispatch(loadDicts()),
  loadMeta: () => dispatch(loadMeta()),

  selectCompany: (id: string | number) => dispatch(listSelect(id)),
  deleteCompany: (id: string | number) => dispatch(listDelete(id)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Companies);