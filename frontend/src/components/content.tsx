import React from 'react';
import {Box, Typography} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    root: {
      background: 'white',
      width: '80%',
      color: 'black',
      padding: theme.spacing(2),
    },
  })
);

interface Props<T> {
  data: any;
  title: string;
}

const Content = <T extends object>(props: Props<T>) => {
  const styles = useStyles();
  const {data, title} = props;

  return(
    <Box className={styles.root} boxShadow={5}>
      <Typography variant={'h4'}>
        {title}
      </Typography>
      <Box>
        {Object.keys(data).map(key => <div><span>{key}: </span><span>{data[key]}</span></div>)}
      </Box>
    </Box>
  )
}

export default Content;
