import React from 'react';
import { v4 as uuidv4} from 'uuid';
import {
  Box,
  Typography,
  List,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(0, 0, 2),
      padding: theme.spacing(2, 2, 0),
    },
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
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.demo}>
        <List>
          {generate(elementGen, data, elementClick)}
        </List>
      </div>
    </Box>
  );
}
