import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {Box, Fab, List, Tooltip, Typography,} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Add as AddIcon} from '@material-ui/icons';
import {ListItemType, ListItemTypeGen} from '../components/ListItems/types';
import {RequestStatus} from "./api/types";
import CircularProgress from '@material-ui/core/CircularProgress';


interface Props {
  data: ListItemType[];
  status: RequestStatus;
  elementGen: ListItemTypeGen;
  elementClick: any;
  title: string;
  keyVal: string;
  pagination: () => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: 'fit-content',
      maxWidth: '32%',
      backgroundColor: '#FFF',
      color: 'black',
      borderRight: '1px solid #CCC',
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(0, 0, 2),
      padding: theme.spacing(2, 2, 0),
    },
    fab: {
      float: 'right',
      width: '36px',
      height: '36px',
    },
    centerLoader: {
      display: 'flex',
      justifyContent: 'center',
    }
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
  const {title, data, elementGen, elementClick, status} = props;

  return (
    <Box className={classes.root}>
      <>
        <>
          <Typography variant="h6" className={classes.title}>
            {title}
            <Tooltip title="Add" aria-label="add">
              <Fab color="primary" className={classes.fab}>
                <AddIcon fontSize={'small'} />
              </Fab>
            </Tooltip>
          </Typography>
        </>
        <div className={classes.demo}>
          <List>
            {
              status === RequestStatus.LOADING ?
              <div className={classes.centerLoader}>
                <CircularProgress />
              </div>
                :
              data && generate(elementGen, data, elementClick)
            }
          </List>
        </div>
      </>
      {props.pagination()}
    </Box>
  );
}
