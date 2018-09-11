import React, { Fragment, Component } from 'react';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { dispatchChangeQuestion, dispatchMarkQuestion, 
  dispatchChangeQuestionStatus, dispatchSetAnswer, dispatchCleanMarkedQuestions,
  dispatchSetGrade } from '../actions/exam';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

export const styles = theme => ({
  navButton: {
    margin: theme.spacing.unit
  }
})

const ButtonCSS = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1) !important;
`;

const ButtonMistake = styled(Button)`
  background-color: rgb(199, 67, 44) !important;
`;

const ButtonCorrect = styled(Button)`
  background-color: rgb(34, 184, 34) !important;
`;

export class NumbersNavigation extends Component {
  constructor(props) {
    super(props);
    this.onQuestionSummaryClick = this.onQuestionSummaryClick.bind(this);
  }

  onQuestionSummaryClick = index => {
    this.props.dispatchChangeQuestion(index);
  }
  
  render () {
    const { questions, currQuestion, classes, 
          answeredQuestions, questionsStatus } = this.props
    return (
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
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
});
  
export default compose(
  withStyles(styles), 
  connect(undefined, mapDispatchToProps))
  (NumbersNavigation);