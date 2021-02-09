import React, {useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {listDelete, ListRequestConfig, listSelect, loadList,} from '../components/listDuck';
import Content from "../components/content";
import ListComponent from '../components/list';
import CompanyListItem from '../components/ListItems/CompanyItem';
import {RootState} from "../store/rootReducer";
import {Box, Fab, Grid, Tooltip} from "@material-ui/core";
import AnyFormBag from "../components/forms/AnyFormBag";
import {loadDicts, loadMeta} from "../components/api/dictsDuck";
import {RequestStatus} from "../components/api/types";
import TablePagination from '@material-ui/core/TablePagination';
import {companiesPageStyles} from './styles';
import {Add as AddIcon, Edit as EditIcon} from "@material-ui/icons";
import {FormModes} from "../components/forms/types";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from "@material-ui/icons/Search";
import {ConnectedSearch} from "../components/fields";


const Companies = (props: any) => {
  const {
    data: companiesData, selected: company,
    meta, dicts, dictsMetaStatus, dictsMetaError, status: metaStatus,
    selectCompany, deleteCompany, loadList, loadDicts, loadMeta
  } = props;

  const classes = companiesPageStyles();
  const [showForm, setShowForm] = useState<FormModes>(FormModes.HIDDEN);
  const [formName, setFormName] = useState<string>('');
  // TODO: move to redux
  const [pageSize, setPageSize] = useState<number>(companiesData?.data?.pagination.pageSize | 10);
  const [page, setPage] = useState<number>(companiesData?.data?.pagination.page | 0);

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
        metaStatus={metaStatus}
        elementGen={CompanyListItem}
        elementClick={{selectCompany, deleteCompany}}
        title={'List of companies'}
        keyVal={'Company'}
        callForm={() => meta && <Tooltip
          title="Add"
          aria-label="add"
          onClick={() => {
            setShowForm(
              showForm === FormModes.HIDDEN ? FormModes.ADD : FormModes.HIDDEN
            );
            setFormName('company');
          }}>
            <Fab color="primary" className={classes.fab}>
              <AddIcon fontSize={'small'} />
            </Fab>
          </Tooltip>
        }
        search={(disabled: boolean) => (<>
          <SearchIcon className={classes.svgSearch} />
          <ConnectedSearch
            disabled={disabled}
            label="Search"
            name="companies"
            pagination={`page_index=${page}&page_size=${pageSize}`}
            className={classes.searchBar}
          />
        </>)}
        pagination={
          () => companiesData?.data?.pagination && <TablePagination
            className={classes.root}
            component="div"
            count={companiesData?.data?.pagination.pageCount * companiesData?.data?.pagination.pageSize}
            onChangePage={handleChangePage}
            page={page}
            rowsPerPage={pageSize}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 30, 50, 100, 200, 300]}
          />
        }
      />

      {company && <Content
        title={'Company details'}
        data={company}
        // TODO: tooltips must be extracted to separate function.
        callPersonForm={() => meta && <Tooltip
          title="Add person"
          aria-label="Add person"
          onClick={() => {
            setShowForm(
              showForm === FormModes.HIDDEN ? FormModes.EDIT : FormModes.HIDDEN
            );
            setFormName('person');
          }}
        >
          <Fab color="primary" className={classes.fab}>
            <PersonAddIcon fontSize={'small'} />
          </Fab>
        </Tooltip>}
        callCompanyForm={() => meta && <Tooltip
          title="Edit"
          aria-label="Edit"
          onClick={() => {
            setShowForm(
              showForm === FormModes.HIDDEN ? FormModes.EDIT : FormModes.HIDDEN
            );
            setFormName('company');
          }}
        >
          <Fab color="primary" className={classes.fab}>
            <EditIcon fontSize={'small'} />
          </Fab>
        </Tooltip>}
      />}

      {(meta && showForm !== FormModes.HIDDEN) && <AnyFormBag
        formName={formName}
        handleClose={() => setShowForm(FormModes.HIDDEN)}
        existingValues={
          showForm === FormModes.EDIT ? company : null
        }
      />}
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