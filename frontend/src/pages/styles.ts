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
    searchBar: {
      '& input': {
        color: 'black',
        background: 'none',
        border: 'none',
        borderRadius: 0,
        padding: theme.spacing('15px', '10px', '5px', '10px'),
        width: '320px',
      },
    },
    svgSearch: {
      marginLeft: '20px',
    },
  }))
