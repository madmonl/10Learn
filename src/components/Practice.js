import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, FormHelperText, Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Exam from './Exam';
import { Send } from '@material-ui/icons';
import QuestionGenerator from './QuestionGenerator';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: { 
    padding: theme.spacing.unit * 2, 
    overflowY: 'auto',
    height: '500px',
    marginTop: '5px'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

export class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjects: [],
      noSubjectsChosenError: false,  
      startExam: false,
      questions: []
    }

    this.onChange = this.onChange.bind(this);
    this.onStartExamClick = this.onStartExamClick.bind(this);
  }

  onChange = subject => {
    this.setState(({ selectedSubjects }) => {
      if (selectedSubjects.includes(subject)) {
        selectedSubjects.splice(selectedSubjects.indexOf(subject), 1)
        return { selectedSubjects }
      } else return { 
        selectedSubjects: [
          ...selectedSubjects,
          subject
        ] 
      }
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
      this.setState(() => ({
        startExam: true,
        questions: questions
      }))
      console.log('hi');
    }
  }

  render() {
    const { classes, subjects } = this.props,
        { questions, selectedSubjects, noSubjectsChosenError, startExam } = this.state;

    return (
      <div className="content-container">
        <Paper className={classes.paper}>
          { !startExam
              ? <Fragment>
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
                </Fragment>                
              : <Exam 
                  subjects={selectedSubjects} 
                  questions={questions}
                />
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

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, undefined)
  )(Practice);