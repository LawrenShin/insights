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
  title: string;
  keyVal: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '20%',
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

function generate(elementGen: ListItemTypeGen, data: ListItemType[]) {

  return data.map((value): React.ReactElement => {
    return React.cloneElement(elementGen(value), {
      key: uuidv4(),
    })
  });
}


export default function ListComponent (props: Props) {
  const classes = useStyles();
  const {title, data, elementGen} = props;

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.demo}>
          <List>
            {generate(elementGen, data)}
          </List>
        </div>
      </Box>
    </>
  );
}
