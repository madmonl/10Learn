import React, { Fragment, Component } from 'react';
import { Button, Modal, Slide, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Done } from '@material-ui/icons';
import styled from 'styled-components';
import { dispatchChangeQuestion, dispatchChangeQuestionStatus, 
  dispatchCleanMarkedQuestions, dispatchSetGrade } from '../actions/exam';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

function getModalStyle() {
  return {
    margin:'auto'
  };
}

export const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonSubmitExam: {
    margin: theme.spacing.unit,
    width: 64 * 2 + 20,
    height: 36 * 2 + 20,
    padding: 0,
    margin: 0
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

export class SubmitExamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.onSubmitExam = this.onSubmitExam.bind(this);
    this.onSpectateExamSolutions = this.onSpectateExamSolutions.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidUpdate (prevProps) {
    if(prevProps.questionsStatus !== this.props.questionsStatus) {
      this.props.dispatchSetGrade((this.props.questionsStatus.reduce((prevQuestionsStatuses, questionStatus) => {
        if (questionStatus === 'correct') {
          prevQuestionsStatuses.push(questionStatus);
          return prevQuestionsStatuses;
        } else {
          return prevQuestionsStatuses
        }
      }, []).length / 10) * 100);   
    }
  }
  
  onSubmitExam = () => {
    // Open Modal
    var index = 0;
    for (; index < 10; index++) {
      this.props.dispatchChangeQuestionStatus(index, this.props.questions[index].index === this.props.answersStatus[index]
        ? 'correct'
        : 'mistake'
      );
    };
    this.setState({ open: true });    
  }

  onSpectateExamSolutions = () => {
    // Clean marked questions so we can mark correct and wrong 
    // answers in red or green respectively. 
    this.props.dispatchCleanMarkedQuestions();
    this.props.dispatchChangeQuestion(0);
    this.setState({ open: false });
  }

  onModalClose = (questionsStatus) => {
    // Close Modal
    this.setState({ open: false })
  }
  render () {
    const { questions, classes, answeredQuestions, questionsStatus, 
          answersStatus, grade } = this.props,
          { open } = this.state;
          
    return (
      <Fragment>
        <Button 
          onClick={this.onSubmitExam} 
          variant="contained" 
          size="small" 
          className={classes.buttonSubmitExam}
        >            
          סיום מבחן
          <Done className={classes.IconLeft} />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={() => this.onModalClose(questionsStatus)}
          className="MuiModal-root-container"
        >
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                הציון שלך הוא: {grade}
              </Typography>                
              <Button onClick={this.onSpectateExamSolutions} variant="contained" size="small" className={classes.button}>            
                צפייה בתשובות
                <Done className={classes.IconLeft} />
              </Button>
              <Button onClick={() => {}} variant="contained" size="small" className={classes.button}>            
                מבחן חדש
                <Done className={classes.IconLeft} />
              </Button>
            </div>
          </Slide>
        </Modal>
      </Fragment>
    );
  };
};
    
const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
    dispatchChangeQuestionStatus: (index, status) => dispatch(dispatchChangeQuestionStatus(index, status)),
    dispatchCleanMarkedQuestions: () => dispatch(dispatchCleanMarkedQuestions()),
    dispatchSetGrade: (grade) => dispatch(dispatchSetGrade(grade))
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    answeredQuestions: state.exam.answeredQuestions,
    questionsStatus: state.exam.questionsStatus,
    answersStatus: state.exam.answersStatus,
    grade: state.exam.grade
});

export default compose(
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))
  (SubmitExamModal);

SubmitExamModal.propTypes = {
  classes: PropTypes.object.isRequired,
};