import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerLoader: {
      display: 'flex',
      justifyContent: 'center',
    }
  }),
);


const Loader = (props: any) => {
  const classes = useStyles();
  return (
    <div className={`${classes.centerLoader}`}>
      <CircularProgress size={props.size} className={props.styles} />
    </div>
  )
}

export default Loader;