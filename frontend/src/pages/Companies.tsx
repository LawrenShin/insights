import React, {useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {listDelete, ListRequestConfig, listSelect, loadList,} from '../components/listDuck';
import Content from "../components/content";
import ListComponent from '../components/list';
import CompanyListItem from '../components/ListItems/CompanyItem';
import {RootState} from "../store/rootReducer";
import {Box, Fab, Tooltip} from "@material-ui/core";
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
  // selection of a company handled by redux. But for person I saw no need in that.
  const [selectedPerson, setSelectedPerson] = useState(null);
  // TODO: move to redux... or not?
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

  const getExistingValues = () => {
    if (formName === 'company') return company;
    if (formName === 'person') return selectedPerson;
  }

  const setFormStates = (givenName: string, mode: FormModes) => {
    setShowForm(showForm === FormModes.HIDDEN ? mode : FormModes.HIDDEN);
    setFormName(givenName);
  }

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
          onClick={() => {setFormStates('company', FormModes.ADD)}}>
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
        setSelectedPerson={(person: any) => {
          setSelectedPerson(person);
          setFormStates('person', FormModes.EDIT);
        }}
        // TODO: tooltips must be extracted to separate function.
        callPersonForm={() => meta && <Tooltip
          title="Add person"
          aria-label="Add person"
          onClick={() => {setFormStates('person', FormModes.ADD)}}
        >
          <Fab color="primary" className={classes.fab}>
            <PersonAddIcon fontSize={'small'} />
          </Fab>
        </Tooltip>}
        callCompanyForm={() => meta && <Tooltip
          title="Edit"
          aria-label="Edit"
          onClick={() => {setFormStates('company', FormModes.EDIT)}}
        >
          <Fab color="primary" className={classes.fab}>
            <EditIcon fontSize={'small'} />
          </Fab>
        </Tooltip>}
      />}

      {(meta && showForm !== FormModes.HIDDEN) && <AnyFormBag
        companyId={company.id || null}
        formName={formName}
        handleClose={() => setShowForm(FormModes.HIDDEN)}
        existingValues={showForm === FormModes.EDIT ? getExistingValues() : null}
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
  deleteCompany: (config: ListRequestConfig) => dispatch(listDelete(config)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(Companies);