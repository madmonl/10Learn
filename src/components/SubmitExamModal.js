import React, { Fragment, Component } from 'react';
import { Button, Modal, Slide, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Done } from '@material-ui/icons';
import styled from 'styled-components';
import { dispatchChangeQuestion, dispatchChangeQuestionStatus, 
  dispatchCleanMarkedQuestions, dispatchSetGrade, startAddExam,
  dispatchSetAnswersStatistics } from '../actions/exam';
import { startChangeTokens } from '../actions/shop';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const TOKENS_PER_CORRECT_ANSWER = 10; 

function getModalStyle() {
  return {
    margin:'auto'
  };
}

export const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  }
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
      const { answersStatistics, questions, answersStatus, 
        questionsStatus, selectedSubjects, stats } = this.props;
      // Probably filter is more recomended than reduce here
      // TODO - check it out!!
      const grade = (this.props.questionsStatus.reduce((prevQuestionsStatuses, questionStatus) => {
        if (questionStatus === 'correct') {
          prevQuestionsStatuses.push(questionStatus);
          return prevQuestionsStatuses;
        } else {
          return prevQuestionsStatuses
        }
      }, []).length / 10) * 100;
      this.props.dispatchSetGrade(grade);   
      this.props.startAddExam({
        questions,
        questionsStatus,
        answersStatus,
        selectedSubjects,
        grade,
        stats
      })
    }
  }
  
  onSubmitExam = () => {
    // Open Modal
    var index = 0;
    let correctAnswersCount = 0, 
        mistakenAnswersCount = 0, 
        notAnsweredQuestionsCount = 0;
    // Counting the correct, mistaken and notAnswered questions for statistical purposes.
    for (; index < 10; index++) {
      // Dont forget to change buttons colors on number navigation.
      if (this.props.questions[index].index === this.props.answersStatus[index]) {
        correctAnswersCount++;
        this.props.dispatchChangeQuestionStatus(index, 'correct')        
      } else if (this.props.questions[index].index !== this.props.answersStatus[index] &&
          this.props.answeredQuestions[index]) {
        mistakenAnswersCount++;
        this.props.dispatchChangeQuestionStatus(index, 'mistake')        
      } else {
        this.props.dispatchChangeQuestionStatus(index, 'not_answered')
      }            
    };
    notAnsweredQuestionsCount = 
      this.props.answeredQuestions.length 
      - correctAnswersCount 
      - mistakenAnswersCount
    
    this.props.startChangeTokens(correctAnswersCount)
      
    this.props.dispatchSetAnswersStatistics({
      correct: correctAnswersCount,
      mistake: mistakenAnswersCount,
      notAnswered: notAnsweredQuestionsCount
    });
    this.setState({ open: true });
  }

  onSpectateExamSolutions = () => {
    // Clean marked questions so we can mark correct and wrong 
    // answers in red or green respectively. 
    this.props.dispatchCleanMarkedQuestions();
    this.props.dispatchChangeQuestion(0);
    this.setState({ open: false });
  }

  onModalClose = () => {
    // Close Modal
    this.setState({ open: false })
  }
  
  render () {
    const { questions, classes, answeredQuestions, questionsStatus, 
          answersStatus, grade } = this.props,
          { open } = this.state;
          //  <Done className={classes.IconLeft} />
    return (
      <div>
        <Button 
          onClick={this.onSubmitExam} 
          variant="contained" 
          size="small" 
          className="button--submit_exam"
        >            
          סיום מבחן          
          <img className="send-icon" src="images/send.png"></img>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={() => this.onModalClose()}
          className="MuiModal-root-container"
        >
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <div style={getModalStyle()} className={"exam__modal-box"}>
              <Typography className="exam__modal_message" variant="title" id="modal-title">
                הציון שלך הוא: {grade}
              </Typography> 
              <div className="exam__modal-buttons">               
                <Button onClick={this.onSpectateExamSolutions} variant="contained" size="small" className={classes.button}>            
                  צפייה בתשובות
                  <Done className={classes.IconLeft} />
                </Button>
                <Button onClick={() => {}} variant="contained" size="small" className={classes.button}>            
                  מבחן חדש
                  <Done className={classes.IconLeft} />
                </Button>
              </div>
            </div>
          </Slide>
        </Modal>
      </div>
    );
  };
};
    
const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
    dispatchChangeQuestionStatus: (index, status) => dispatch(dispatchChangeQuestionStatus(index, status)),
    dispatchCleanMarkedQuestions: () => dispatch(dispatchCleanMarkedQuestions()),
    dispatchSetGrade: (grade) => dispatch(dispatchSetGrade(grade)),
    startAddExam: (exam) => dispatch(startAddExam(exam)),
    dispatchSetAnswersStatistics: (stats) => dispatch(dispatchSetAnswersStatistics(stats)),
    startChangeTokens: (tokens) => dispatch(startChangeTokens(tokens)) 
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    answeredQuestions: state.exam.answeredQuestions,
    questionsStatus: state.exam.questionsStatus,
    answersStatus: state.exam.answersStatus,
    selectedSubjects: state.exam.selectedSubjects,
    grade: state.exam.grade,
    stats: state.exam.stats
});

export default compose(
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))
  (SubmitExamModal);

SubmitExamModal.propTypes = {
  classes: PropTypes.object.isRequired,
};