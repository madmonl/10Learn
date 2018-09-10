import React, { Fragment, Component } from 'react';
import MathJax from 'react-mathjax';
import { Button, Modal, Slide, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Send, Done } from '@material-ui/icons';
import styled from 'styled-components';
import { dispatchChangeQuestion, dispatchChangeButtonColor, dispatchMarkQuestion, 
  dispatchChangeQuestionStatus, dispatchSetAnswer, dispatchCleanMarkedQuestions,
  dispatchSetGrade } from '../actions/exam';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function getModalStyle() {
  return {
    margin:'auto'
  };
}


const ButtonCSS = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1) !important;
`;

const ButtonMistake = styled(Button)`
  background-color: rgb(199, 67, 44) !important;
`;

const ButtonCorrect = styled(Button)`
  background-color: rgb(34, 184, 34) !important;
`;

export const styles = theme => ({
  navButton: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

export class Exam extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.onQuestionSummaryClick = this.onQuestionSummaryClick.bind(this);
    this.onQuestionChange == this.onQuestionChange.bind(this);
  }

  onQuestionChange = direction => {
    if (direction === 'prev'){
      this.props.dispatchChangeQuestion( this.props.currQuestion === 0 
        ? this.props.questions.length - 1
        : this.props.currQuestion - 1)
    } else if (direction === 'next') {
      this.props.dispatchChangeQuestion((this.props.currQuestion + 1) % 10)
    } else {
      throw "Button direction is incorrect.";
    }
  }
  
  onQuestionSummaryClick = index => {
    this.props.dispatchChangeQuestion(index);
    // this.props.dispatchChangeButtonColor(index);  
  }

  onSubmitQuestion = (index, answer) => {
    this.props.dispatchChangeQuestion((index + 1) % 10);
    this.props.dispatchMarkQuestion(index);
    this.props.dispatchSetAnswer(index, answer);
  } 

  onSubmitExam = questionsStatus => {
    // Open Modal
    var index = 0;
    for (; index < 10; index++) {
      this.props.dispatchChangeQuestionStatus(index, this.props.questions[index].index === this.props.answersStatus[index]
        ? 'correct'
        : 'mistake'
      );
    };
    this.props.dispatchSetGrade((questionsStatus.reduce((prevQuestionsStatuses, questionStatus) => {
      if (questionStatus === 'correct') {
        prevQuestionsStatuses.push(questionStatus);
        return prevQuestionsStatuses;
      } else {
        return prevQuestionsStatuses
      }
    }, []).length / 10) * 100);   
    this.setState({ open: true });
  }

  onModalClose = () => {
    // Close Modal
    this.setState({ open: false })
  }

  onSpectateExamSolutions = () => {
    // Clean marked questions so we can mark correct and wrong 
    // answers in red or green respectively. 
    this.props.dispatchCleanMarkedQuestions();
    this.props.dispatchChangeQuestion(0);
    this.setState({ open: false });
  }

  solutionClassName = (index, questions, currQuestion, questionsStatus, answersStatus) => {
    // one of:
    // "exam__answer-item" when still in exam - clickable
    // "exam__answer-correct" not clickable - correct solution only
    // "exam__answer-mistake" only a mistaken solution that was chosen.
    // "exam__answer-default" not clickable not chosen, not correct answer
    if (questionsStatus[currQuestion] === 'being_answered') {
      return "exam__answer-item"
    } else if (questions[currQuestion].index === index) {
      return "exam__answer-correct exam__answer-item"
    } else if (questions[currQuestion].index !== index 
      && answersStatus[currQuestion] === index) {
      return "exam__answer-mistake exam__answer-item"
    } else {
      return "exam__answer-default exam__answer-item"
    };
  }
          
  render () {
    const { questions, currQuestion, classes, 
          answeredQuestions, questionsStatus, 
          answersStatus, grade } = this.props,
          { open } = this.state;

    return (
      <div className="exam">
        <div className="exam__upper-footer">
          <div className="exam__navigation-container">
            <div className="exam__navigation">
                {questions.map((undefined, index) => {
                  if ((currQuestion === index || answeredQuestions[index]) 
                    && questionsStatus[index] === 'being_answered') {
                     return (
                      <ButtonCSS
                        key={index}
                        variant="outlined" 
                        className={classes.navButton}
                        onClick={() => this.onQuestionSummaryClick(index)}
                      >
                        {index + 1}
                      </ButtonCSS>
                     )
                  } else if (questionsStatus[index] === 'correct') {
                    return (
                      <ButtonCorrect
                        key={index}
                        variant="outlined" 
                        className={classes.navButton}
                        onClick={() => this.onQuestionSummaryClick(index)}
                      >
                        {index + 1}
                      </ButtonCorrect>
                    )
                  } else if (questionsStatus[index] === 'mistake') {
                    return (
                      <ButtonMistake
                        key={index}
                        variant="outlined" 
                        className={classes.navButton}
                        onClick={() => this.onQuestionSummaryClick(index)}
                      >
                        {index + 1}
                      </ButtonMistake>
                    )
                  } else {
                    return (
                      <Button 
                        key={index}
                        variant="outlined" 
                        className={classes.navButton}
                        onClick={() => this.onQuestionSummaryClick(index)}
                      >
                        {index + 1}
                      </Button>
                    )
                  }
                })}
            </div>
          </div>
          <Button onClick={() => this.onSubmitExam(questionsStatus)} variant="contained" size="small" className={classes.button}>            
            סיום מבחן
            <Done className={classes.IconLeft} />
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={this.onModalClose}
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
        </div>
        <div className="exam__question-navigation-container">
          <div className="exam__question">
            <MathJax.Provider>
              <div>
                  <MathJax.Node formula={questions[currQuestion].question} />
              </div>
            </MathJax.Provider>
          </div>
        </div>
        <div className="exam__answers">
          {questions[currQuestion].solutions.map((solution, index) =>
            <div 
              className={
                this.solutionClassName(index, questions, currQuestion, questionsStatus, answersStatus)
              }
              key={index}
              onClick={() => this.onSubmitQuestion(currQuestion, index)}
            >
              <MathJax.Provider>
                <div>
                    <MathJax.Node formula={solution} />
                </div>
              </MathJax.Provider>
            </div>             
          )}
        </div>
        <div className="exam__navigation-container">
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => this.onQuestionChange('prev')}
          >
            <Send className={classes.rightIcon} />
            שאלה קודמת            
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => this.onQuestionChange('next')}
          >
            שאלה הבאה
            <Send className={classes.leftIcon} />
          </Button>
        </div>        
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
    dispatchChangeButtonColor: (index) => dispatch(dispatchChangeButtonColor(index)),
    dispatchMarkQuestion: (index) => dispatch(dispatchMarkQuestion(index)),
    dispatchChangeQuestionStatus: (index, status) => dispatch(dispatchChangeQuestionStatus(index, status)),
    dispatchSetAnswer: (index, answer) => dispatch(dispatchSetAnswer(index, answer)),
    dispatchCleanMarkedQuestions: () => dispatch(dispatchCleanMarkedQuestions()),
    dispatchSetGrade: (grade) => dispatch(dispatchSetGrade(grade))
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    currQuestion: state.exam.currQuestion,
    answeredQuestions: state.exam.answeredQuestions,
    questionsStatus: state.exam.questionsStatus,
    answersStatus: state.exam.answersStatus,
    grade: state.exam.grade,
});
  
export default compose(
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))
  (Exam);

Exam.propTypes = {
  classes: PropTypes.object.isRequired,
};
