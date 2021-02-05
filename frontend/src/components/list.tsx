import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {Box, Grid, List, Typography,} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ListItemType, ListItemTypeGen} from '../components/ListItems/types';
import {RequestStatus} from "./api/types";
import Loader from './loader';


interface Props {
  data: ListItemType[];
  status: RequestStatus;
  metaStatus: RequestStatus;
  elementGen: ListItemTypeGen;
  elementClick: any;
  title: string;
  keyVal: string;
  pagination: () => JSX.Element;
  callForm: () => JSX.Element;
  search: (disabled: boolean) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '100vh',
      overflow: 'scroll',
      flexGrow: 1,
      width: '32%',
      maxWidth: '32%',
      backgroundColor: '#FFF',
      color: 'black',
      borderRight: '1px solid #CCC',
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    centerLoader: {
      height: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      margin: theme.spacing(0, 0, 2),
      padding: theme.spacing(2, 2, 0),
    },
  }),
);

function generate(elementGen: ListItemTypeGen, data: ListItemType[], elementClick: any) {

  return data.map((value, i): React.ReactElement => {
    return React.cloneElement(elementGen(value, elementClick), {
      key: uuidv4(),
      style: {
        marginBottom: i === data.length - 1 ? '40px' : 0,
      },
    })
  });
}


export default function ListComponent (props: Props) {
  const classes = useStyles();
  const {title, data, elementGen, elementClick, status, metaStatus, callForm, search} = props;

  return (
    <Box className={classes.root}>
      <>
        <>
          <Typography variant="h6" className={classes.title}>
            {title}
            {metaStatus !== RequestStatus.LOADING ? callForm() : <Loader />}
          </Typography>
          <Grid container spacing={1} alignItems="flex-end">
            {search(status === RequestStatus.LOADING)}
          </Grid>
        </>
        <div className={`${classes.demo} ${status === RequestStatus.LOADING ? classes.centerLoader : ''}`}>
          <List>
            {
              status === RequestStatus.LOADING ?
              <Loader />
                :
              data && generate(elementGen, data, elementClick)
            }
          </List>
        </div>
      </>
      {status !== RequestStatus.LOADING && props.pagination()}
    </Box>
  );
}
