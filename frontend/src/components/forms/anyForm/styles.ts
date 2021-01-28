import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 0, 0, 8),
      background: '#1a202c',
      overflow: 'scroll',
      maxHeight: '100vh',
      maxWidth: '60%',
      position: 'fixed',
      right: '0%',
      zIndex: 200,
      color: '#FFF',
    },
    subEntity: {
      marginLeft: '20px',
    },
    title: {
      marginTop: '.5em',
    },
    borderBottom: {
      borderBottom: '1px solid',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'right',
      gap: '2em',
    },
    input: {
      padding: '5px !important',
    },
    checkbox: {
      display: 'flex',
    },
    checkBoxLabel: {
      marginTop: 0
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    closeIcon: {
      margin: theme.spacing(0, '20px', 0, 0),
      '&:hover': {
        cursor: 'pointer',
        color: 'red',
      }
    },
  }),
);