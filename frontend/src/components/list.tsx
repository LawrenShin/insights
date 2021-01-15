import React from 'react';
import { v4 as uuidv4} from 'uuid';
import {
  Box,
  Typography,
  List, Tooltip, Fab,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Add as AddIcon} from '@material-ui/icons';
import {ListItemType, ListItemTypeGen} from '../components/ListItems/types';


interface Props {
  data: ListItemType[];
  elementGen: ListItemTypeGen;
  elementClick: any;
  title: string;
  keyVal: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '20%',
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
      margin: theme.spacing(0, 0, 0, 3),
      width: '36px',
      height: '36px',
    }
  }),
);

function generate(elementGen: ListItemTypeGen, data: ListItemType[], elementClick: any) {

  return data.map((value): React.ReactElement => {
    return React.cloneElement(elementGen(value, elementClick), {
      key: uuidv4(),
    })
  });
}


export default function ListComponent (props: Props) {
  const classes = useStyles();
  const {title, data, elementGen, elementClick} = props;

  return (
    <Box className={classes.root}>
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
          {data && generate(elementGen, data, elementClick)}
        </List>
      </div>
    </Box>
  );
}
