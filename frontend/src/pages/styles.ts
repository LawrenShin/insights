import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export const companiesPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      background: 'white',
      width: '32%',
      borderTop: '1px solid #AAA',
      '& .MuiTablePagination-spacer': {
        display: 'none',
      },
      '& .MuiTablePagination-selectRoot': {
        marginRight: '5px',
      },
      '& .MuiTablePagination-actions': {
        position: 'absolute',
        right: 0,
      },
      '& .MuiTablePagination-actions > button': {
        padding: 0,
      }
    },
    fab: {
      float: 'right',
      width: '36px',
      height: '36px',
    },
  }))
