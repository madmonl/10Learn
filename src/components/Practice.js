import React, { Fragment } from 'react';
import { Button, IconButton, Typography, Toolbar, AppBar, Tabs, Tab, 
  Badge, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  paper: { 
    padding: theme.spacing.unit * 2, 
    overflowY: 'auto' ,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 10px)',
      marginTop: 5  
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    }
  },

  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },

  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 58px - 48px)'
    }
  },
  
  item: {
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  }
})

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Typography
          variant="subheading"
          style={{ marginTop: 20 }}
        >
          Hi from Practice.
        </Typography>            
      </Paper>
    </Fragment>
  )
});