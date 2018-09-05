import React, { Fragment } from 'react';
import { Typography, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  paper: { 
    padding: theme.spacing.unit * 2, 
    overflowY: 'auto',
    height: '500px',
    marginTop: '5px'
  }
});

export const PrevExams = props => {
  const { classes, subjects } = props;
  return (
    <div className="content-container">
      <Paper className={classes.paper}>
        <Typography
          variant="subheading"
          style={{ marginTop: 20 }}
        >
          מבחן:
        </Typography>            
      </Paper>
    </div>
  )
};

const mapStateToProps = (state) => ({
  subjects: state.material.subjects
})

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, undefined)
  )(PrevExams);