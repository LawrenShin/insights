import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 0, 0, 10),
      background: '#1a202c',
      overflow: 'scroll',
      maxHeight: '100vh',
      maxWidth: '60%',
      position: 'fixed',
      right: '0%',
      zIndex: 200,
    },
    title: {
      marginTop: '.5em',
    },
    input: {
      padding: '5px !important',
    },
    checkbox: {
      display: 'flex',
    },
    checkBoxLabel: {
      marginTop: 0
    }
  }),
);