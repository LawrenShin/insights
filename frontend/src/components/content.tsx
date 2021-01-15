import React from 'react';
import {Box, Fab, Tooltip, Typography} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Edit as EditIcon} from "@material-ui/icons";
import { v4 as uuidv4} from 'uuid';


// TODO: move in separate file
const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    root: {
      background: 'white',
      width: '80%',
      color: 'black',
      padding: theme.spacing(1, 2, 2,3),
    },
    fieldName: {
      fontWeight: 'bold',
    },
    tooltipContainer: {
      display: 'flex',
      borderBottom: '5px solid #ccc',
      marginBottom: theme.spacing(2),
    },
    fab: {
      height: '36px',
      width: '36px',
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  })
);

interface Props {
  data: any;
  title: string;
}

const Content = (props: Props) => {
  const styles = useStyles();
  const {data, title} = props;

  return(
    <Box className={styles.root} boxShadow={5}>
      <Box className={styles.tooltipContainer}>
        <Box className={styles.title}>
          <Typography variant={'h4'}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Edit" aria-label="Edit">
            <Fab color="primary" className={styles.fab}>
              <EditIcon fontSize={'small'} />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        {/*TODO: display company properly*/}
        {Object.keys(data).map(key => <div key={uuidv4()}>
          <span className={styles.fieldName}>
            {key[0].toUpperCase()}{key.substr(1, key.length)}: &nbsp;
          </span>
          <span>{typeof data[key] !== 'object' && data[key]}</span>
        </div>)}
      </Box>
    </Box>
  )
}

export default Content;
