import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, FormHelperText, Button, IconButton, Chip } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Exam from './Exam';
import { Send, ChevronRight } from '@material-ui/icons';
import QuestionGenerator from './QuestionGenerator';
import { dispatchSetQuestions, dispatchChangeQuestion, dispatchCleanMarkedQuestions,
  dispatchClearQuestionsStatus, dispatchSetAnswersStatusToNone, 
  dispatchClearAnswersStatus, dispatchSetSelectedSubjects } from '../actions/exam';

export const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: { 
    overflowY: 'auto',
    height: '900px',
    marginTop: '5px'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

export class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjects: [],
      noSubjectsChosenError: false,  
      startExam: false,
      chipCount: 0
    }

    this.onChange = this.onChange.bind(this);
    this.onStartExamClick = this.onStartExamClick.bind(this);
    this.onDeleteChip = this.onDeleteChip.bind(this);
    this.onReturn = this.onReturn.bind(this);
  }

  onChange = subject => {
    this.setState(({ chipCount, selectedSubjects }) => {
      if (selectedSubjects.includes(subject)) {
        selectedSubjects.splice(selectedSubjects.indexOf(subject), 1)
        return { selectedSubjects, chipCount: chipCount - 1 }
      } else return { 
        selectedSubjects: [
          ...selectedSubjects,
          subject
        ],
        chipCount: chipCount + 1
      }
    })
  }

  onReturn = () => {
    this.props.dispatchChangeQuestion(0);
    this.props.dispatchSetAnswersStatusToNone();
    this.props.dispatchClearQuestionsStatus();
    this.setState({ startExam: false });
  }

  onDeleteChip = subjectIndex => {
    this.setState(({ chipCount, selectedSubjects }) => {
      if (chipCount === 1) {
        return {
          chipCount: chipCount - 1,
          startExam: false,
          selectedSubjects: [] 
        }
      } else {
        selectedSubjects.splice(subjectIndex, 1);
        return { 
          chipCount: chipCount - 1,
          selectedSubjects: selectedSubjects 
        }
      };
    }, () => { 
      this.state.startExam && this.onStartExamClick()
    })
  }
    
    
  

  onStartExamClick = () => {
    if (this.state.selectedSubjects.length === 0) {
      this.setState(() => ({
        noSubjectsChosenError: true
      }))
    } else {
      const questions = [];
      var i;
      for (i = 0; i < 10; i++) {
        questions[i] = QuestionGenerator({
          subjects: this.state.selectedSubjects
        });
      }
      this.setState(({ selectedSubjects }) => ({
        startExam: true,
        chipCount: selectedSubjects.length
      }))
      this.props.dispatchSetQuestions(questions)
    }
    this.props.dispatchCleanMarkedQuestions();
    this.props.dispatchChangeQuestion(0);
    this.props.dispatchClearQuestionsStatus();
    this.props.dispatchClearAnswersStatus();
    this.props.dispatchSetSelectedSubjects(this.state.selectedSubjects);
    // TODO clear answers status to -1 as well
  }

  render() {
    const { classes, subjects, dispatchChangeQuestion } = this.props,
        { selectedSubjects, noSubjectsChosenError, startExam } = this.state;

    return (
      <div className="content-container">
        <Paper className={classes.paper}>
          <IconButton 
            className={classes.button} 
            disabled={!startExam}
            aria-label="ChevronRight"
            onClick={this.onReturn}
            color="primary"
          >
            <ChevronRight />
          </IconButton>
          {
            selectedSubjects.map((subject, index) => 
              <Chip 
                key={index}
                label={subject}
                onDelete={() => this.onDeleteChip(index)}
                className={classes.chip}
                color="primary"
                variant="outlined"
              />
            )
          }
          { !startExam
              ? <div>
                  <Typography
                    variant="subheading"
                    style={{ marginTop: 20 }}
                  >
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">בחרו נושאים:</FormLabel>
                      <FormGroup>
                        {
                          subjects.map(subject => (
                            <FormControlLabel
                              key={subject} 
                              control={
                                <Checkbox key={subject} checked={selectedSubjects.includes(subject)} onChange={() => this.onChange(subject)} value={subject} />
                              }
                              label={subject}
                            />
                          ))
                        }
                      </FormGroup>
                      { noSubjectsChosenError && <FormHelperText>בחרו נושא אחד לפחות!</FormHelperText>}
                    </FormControl>
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onStartExamClick}
                  >
                    התחל מבחן
                    <Send className={classes.rightIcon} />
                  </Button>
                </div>                
              : <Exam />
          }
        </Paper>
      </div>
    )
  } 
};

Practice.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  subjects: state.material.subjects
});

const mapDispatchToProps = dispatch => ({
  dispatchSetQuestions: (questions) => dispatch(dispatchSetQuestions(questions)),
  dispatchChangeQuestion: (index) => dispatch(dispatchChangeQuestion(index)), 
  dispatchCleanMarkedQuestions: () => dispatch(dispatchCleanMarkedQuestions()),
  dispatchClearQuestionsStatus: () => dispatch(dispatchClearQuestionsStatus()),
  dispatchSetAnswersStatusToNone: () => dispatch(dispatchSetAnswersStatusToNone()),
  dispatchClearAnswersStatus: () => dispatch(dispatchClearAnswersStatus()),
  dispatchSetSelectedSubjects: (selectedSubjects) => dispatch(dispatchSetSelectedSubjects(selectedSubjects))
})

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, mapDispatchToProps)
  )(Practice);