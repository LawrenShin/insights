import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Avatar, Box, Chip, Typography} from "@material-ui/core";
import { v4 as uuidv4} from 'uuid';
import {Dispatch} from "redux";
import useStyles from "./contentStyles";
import {listDelete, ListRequestConfig, loadList} from "./listDuck";
import {RootState} from "../store/rootReducer";
import {DictItem} from "./api/types";
import Loader from "./loader";

enum Roles {
  EXECUTIVES = 1,
  BOARD,
  BOTH,
}

enum Tabs {
  EXECUTIVES,
  BOARDS,
  CONTENT,
}

interface StateProps {
  accessRights: string[] | [];
  dicts: any;
  meta: any;
}
interface DispatchProps {
  loadList: (config: ListRequestConfig) => void;
  deletePerson: (config: ListRequestConfig) => void;
}
interface Props extends DispatchProps, StateProps{
  data: any;
  title: string;
  setSelectedPerson: (person: any) => void;
  callPersonForm: () => JSX.Element;
  callCompanyForm: () => JSX.Element;
}


// differ fields by types
const renderField = (element: any, fieldName: string, dicts: any, renderChip: any, styles: any, meta?: any) => {
  if (typeof element === 'boolean') {
    return <span>{element ? 'Yes' : 'No'}</span>
  }
  const renamedField = fieldName === 'highEducation' ? 'educationLevel' : fieldName;
  if (typeof element === 'number' && dicts[renamedField]) {
    // TODO: refactor this renaming
    const value = dicts[renamedField]
      .filter((dictElement: DictItem) => dictElement.id === element)[0];
    return <span>{value.name}</span>
  }
  if ((typeof element !== 'object' && element && !Array.isArray(element))) {
    return <span>{element}</span>
  }
  if (Array.isArray(element)) {
    return element.length ? <div style={{marginLeft: '20px'}}>
      {element.map((el: any) => <div>
        {renderFields(el, dicts, renderChip, styles, meta)}
      </div>)}
    </div> : 'Empty';
  }
  if (typeof element === 'object') {
    if (element === null) return 'No data';
    return <div style={{marginLeft: '20px'}}>
      {renderFields(element, dicts, renderChip, styles, meta)}
    </div>
  }
}

const renderFields = (entity: any, dicts: any, renderChip: any, styles: any, meta?: any) => {
  if (entity) {
    // get name for person and place one instead of key on entity
    return Object.keys(entity).map((key, index) => {
      if (key.match(/^[\w+]+Id$|^id$/gi)) return;
      let nameInsteadOfKey = null;
      let personCleared = null;
      // chip displays on name prop.
      // clear from indexes in names on array entities like people
      if (typeof +key === 'number' && (entity[key]?.name)) {
        const {name, title, ...rest} = entity[key];
        nameInsteadOfKey = entity[key]?.name;
        personCleared = rest
      }
      if (key !== 'people' && key !== 'roles') {
        return <div key={uuidv4()}>
          <span className={styles.fieldName}>
            {nameInsteadOfKey ?
              renderChip(nameInsteadOfKey, entity[key])
              :
              // meta[key]?.displayName ? `${meta[key]?.displayName}: ` : `${key[0].toUpperCase()}${key.substr(1, key.length)}`
              // undefined in DI DUE TO di - meta, dI - data
              // undefined in country due ti no display name for iso and rext
              `${meta[key]?.displayName}: `
            }<br/>
          </span>
          {renderField(
            personCleared || entity[key],
            key,
            dicts,
            renderChip,
            styles,
            meta[key]?.fieldType === 'NestedEntity' ? meta[key].meta : meta
          )}
        </div>
      }
    });
  }

  return 'No data';
}

const Content = (props: Props) => {
  const styles = useStyles();
  const {meta, data, title, callCompanyForm, callPersonForm, dicts, setSelectedPerson, deletePerson, accessRights} = props;

  const [tab, setTab] = useState<Tabs>(Tabs.CONTENT);
  const [clickedChip, setClickedChip] = useState<string>('');
  const [executives, setExecutives] = useState<any[]>([]);
  const [boards, setBoards] = useState<any[]>([]);

  const filterByRoles = <T extends unknown>(people: T[], role: Roles):T[] =>
    people.filter((person: any) => person.role.roleType === role || person.role.roleType === Roles.BOTH);

  useEffect(() => {
    setExecutives(filterByRoles(data.people, Roles.EXECUTIVES))
    setBoards(filterByRoles(data.people, Roles.BOARD))
  }, [data, data.people]);


  const renderChip = (name: string, entity: any) => <Chip
    avatar={
      clickedChip === name ?
        <Loader size={20} styles={styles.loaderForChip} /> :
          <Avatar>{name[0]}</Avatar>
    }
    label={name}
    color="primary"
    clickable
    disabled={!accessRights.filter((el: string) => el === 'DeletePeople').length}
    onClick={() => setSelectedPerson(entity)}
    onDelete={() => {
      setClickedChip(name);
      deletePerson({ url: 'people', params: `id=${entity.id}` });
    }}
  />
  const renderGoBack = () => <button
    className={styles.backButton}
    type={'button'}
    onClick={() => setTab(Tabs.CONTENT)}
  >Back
  </button>

  return(
    <Box className={styles.root} boxShadow={5}>
      <Box className={styles.tooltipContainer}>
        <Box className={styles.title}>
          <Typography variant={'h4'}>
            {title}
          </Typography>
        </Box>
        <Box>
          <button
            type={'button'}
            onClick={() => setTab(Tabs.CONTENT)}
          >Content</button>
        </Box>
        <Box>
          <button
            type={'button'}
            onClick={() => setTab(Tabs.EXECUTIVES)}
          >Executives</button>
        </Box>
        <Box>
          <button
            type={'button'}
            onClick={() => setTab(Tabs.BOARDS)}
          >Boards</button>
        </Box>
        <Box>
          {callPersonForm()}
        </Box>
        <Box>
          {callCompanyForm()}
        </Box>
      </Box>
      {(dicts && meta) ? <Box className={tab !== Tabs.CONTENT ? styles.personContainer : ''}>
        {tab === Tabs.CONTENT && renderFields(data, dicts, renderChip, styles, meta.company)}

        {tab === Tabs.EXECUTIVES && <>
          {renderGoBack()}
          {executives.length ? renderFields(executives, dicts, renderChip, styles, meta.person) : <h5>No Executives were added</h5>}
        </>}

        {tab === Tabs.BOARDS && <>
          {renderGoBack()}
          {boards.length ? renderFields(boards, dicts, renderChip, styles, meta.person) : <h5>No Boards were added</h5>}
        </>}
      </Box> : <Loader />}
    </Box>
  )
}

export default connect(
  ({
    DictsReducer: {data: {dicts, meta}},
    SignInReducer: {accessRights},
  }: RootState) => ({
    dicts,
    meta,
    accessRights,
  }),
  (dispatch: Dispatch) => ({
    loadList: (config: ListRequestConfig) => dispatch(loadList(config)),
    deletePerson: (config: ListRequestConfig) => dispatch(listDelete(config)),
  })
)(Content);
