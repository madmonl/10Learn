import React, { Fragment } from 'react';
import { Typography, Paper } from '@material-ui/core/';
import { Chip } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import NumbersNavigation from './NumbersNavigation';

const styles = theme => ({
  paper: { 
    padding: 0, 
    overflowY: 'auto',
    height: '500px',
    marginTop: '5px'
  },
  chip: {
    margin: theme.spacing.unit,
    width: 40
  },
});

export const PrevExams = (props) => {
  const { classes, prevExams } = props;
  return (
    <div className="content-container">
      <Paper className={classes.paper}>
        <div className="prevExams">
          {prevExams.map((exam) => 
            <div 
              className="prevExam"
              key={exam.id}
            >
              {exam.selectedSubjects.map((subject, index) =>
                <Chip 
                  key={index}
                  label={subject}
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
              )}
              <NumbersNavigation               
                questions={exam.questions}
                currQuestion={0}
                answeredQuestions={[]}
                questionsStatus={exam.questionsStatus}  
              />
            </div>            
          )}      
        </div>
      </Paper>
    </div>
  )
};

const mapStateToProps = (state) => ({
  prevExams: state.exam.prevExams
})

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, undefined)
  )(PrevExams);