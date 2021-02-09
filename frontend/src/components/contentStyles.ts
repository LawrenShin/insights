import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles(
  (theme: Theme) => createStyles({
    root: {
      maxHeight: '100vh',
      overflow: 'scroll',
      zIndex: 1,
      background: 'white',
      width: '68%',
      color: 'black',
      padding: theme.spacing(1, 2, 2,3),
    },
    fieldName: {
      fontWeight: 'bold',
    },
    tooltipContainer: {
      gap: '20px',
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
    },
    backButton: {
      position: 'fixed',
      bottom: 0,
      right: '50px',
    }
  })
);