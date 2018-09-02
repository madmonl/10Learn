import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const LoadingPage = ({ classes }) => (
  <div className="loader">
    <CircularProgress className={classes.progress} size={80} />
  </div>
);

export default withStyles(styles)(LoadingPage);
