import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Avatar, Box, Chip, Typography} from "@material-ui/core";
import { v4 as uuidv4} from 'uuid';
import {Dispatch} from "redux";
import useStyles from "./contentStyles";
import {Data, ListRequestConfig, loadList} from "./listDuck";
import {RootState} from "../store/rootReducer";
import {DictItem} from "./api/types";


enum Tabs {
  EXECUTIVES,
  BOARDS,
  CONTENT,
}

interface StateProps {
  dicts: any,
}
interface DispatchProps {
  loadList: (config: ListRequestConfig) => void;
}
interface Props extends DispatchProps, StateProps{
  data: any;
  title: string;
  callCompanyForm: () => JSX.Element;
  callPersonForm: () => JSX.Element;
}

// differ fields by types
const renderField = (element: any, fieldName: string, dicts: any, styles: any) => {
  if (typeof element === 'boolean') {
    return <span>{element ? 'Yes' : 'No'}</span>
  }
  if (typeof element !== 'object' && element && !Array.isArray(element)) {
    const value = dicts[fieldName] ?
      dicts[fieldName].filter((dictElement: DictItem) => dictElement.id === element)[0] : element
    return <span>{typeof value === 'object' ? value.name : value}</span>
  }
  if (Array.isArray(element)) {
    return element.length ? <div style={{marginLeft: '20px'}}>
      {element.map((el: any) => <div>
        {renderFields(el, dicts, styles)}
      </div>)}
    </div> : 'Empty';
  }
  if (typeof element === 'object') {
    if (element === null) return 'No data';
    return <div style={{marginLeft: '20px'}}>
      {renderFields(element, dicts, styles)}
    </div>
  }
}

const renderFields = (entity: any, dicts: any, styles: any) => {
  if (entity) {
    // get name for person and place one instead of key on entity
    return Object.keys(entity).map((key, index) => {
      let nameInsteadOfKey = null;
      let personCleared = null;

      if (typeof +key === 'number' && (entity[key]?.name || entity[key]?.title)) {
        const {name, title, ...rest} = entity[key];
        nameInsteadOfKey = entity[key]?.name || entity[key]?.title;
        personCleared = rest
      }

      if (key !== 'people' && key !== 'roles') {
        return <div
          style={{
            borderBottom: index === Object.keys(entity).length - 1 ? '1px solid black' : 'none',
            marginTop: '5px',
          }}
          key={uuidv4()}
        >
          <span className={styles.fieldName}>
            {nameInsteadOfKey ?
              <Chip
                avatar={<Avatar>{nameInsteadOfKey[0]}</Avatar>}
                label={nameInsteadOfKey}
                color="primary"
                clickable
              />
              :
              `${key[0].toUpperCase()}${key.substr(1, key.length)}: `
            }
          </span>
          {renderField(personCleared || entity[key], key, dicts, styles)}
        </div>
      }
    });
  }

  return 'No data';
}

const Content = (props: Props) => {
  const styles = useStyles();
  const {
    data, title, callCompanyForm, callPersonForm, dicts,
  } = props;

  const [tab, setTab] = useState<Tabs>(Tabs.CONTENT);

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
      <Box>
        {tab === Tabs.CONTENT && renderFields(data, dicts, styles)}
        {tab === Tabs.EXECUTIVES && <>
          <button
            className={styles.backButton}
            type={'button'}
            onClick={() => setTab(Tabs.CONTENT)}
          >Back</button>
          {renderFields(data.people, dicts, styles)}
        </>}
        {/*{tab === Tabs.BOARDS && renderFields(data.roles, dicts, styles)}*/}
      </Box>
    </Box>
  )
}

export default connect(
  ({
    DictsReducer: {data: {dicts}} ,
  }: RootState) => ({
    dicts,
  }),
  (dispatch: Dispatch) => ({
    loadList: (config: ListRequestConfig) => dispatch(loadList(config)),
  })
)(Content);
