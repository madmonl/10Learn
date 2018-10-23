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

export class NumbersNavigation extends Component {
  constructor(props) {
    super(props);
    this.onQuestionSummaryClick = this.onQuestionSummaryClick.bind(this);
    this.onButtonClassNameSelect = this.onButtonClassNameSelect.bind(this);
  }

  onQuestionSummaryClick = index => {
    this.props.dispatchChangeQuestion(index);
  }
  
  onButtonClassNameSelect = (index, currQuestion, answeredQuestions, questionsStatus) => {
    if (questionsStatus[index] === 'being_answered') {
      if (!answeredQuestions[index] && currQuestion === index) {
        // chosen but not answered button
        return "button--chosen"        
      } else if (!answeredQuestions[index] && currQuestion !== index) {
        // regular exam button
        return "button--numbers-navigation"
      } else if (answeredQuestions[index] && currQuestion === index) {
        // answered and chosen button
        return "button--answered button--chosen"
      } else if (answeredQuestions[index] && currQuestion !== index) {
        // answered but not chosen button
        return "button--answered"
      } else throw new Error ("Tried to classify the button with no success @NumbersNavigation.onButtonSummaryClick")
    } else {
      // prev exam styles
      if (questionsStatus[index] === 'correct') {
        // correct button
        return !(currQuestion === index) || this.props.preventBorderAppearance 
          ? "button--correct"
          : "button--correct button--chosen" 
      } else if (questionsStatus[index] === 'mistake') {
        // mistake button
        return !(currQuestion === index) || this.props.preventBorderAppearance 
          ? "button--mistake"
          : "button--mistake button--chosen" 
      } else if (questionsStatus[index] === 'not_answered') {
        // not answered button
        return !(currQuestion === index) || this.props.preventBorderAppearance
          ? "button--numbers-navigation"
          : "button--chosen" 
      } else {
        throw new Error("Tried to classify the button with no success @NumbersNavigation.onButtonSummaryClick") 
      }
    } 
  }
  
  render () {
    const { questions, currQuestion, classes, 
          answeredQuestions, questionsStatus } = this.props
    return (
      <div className="exam__navigation-container">
        <div className="exam__navigation">
          {questions.map((undefined, index) => 
            <Button
              key={index}
              variant="outlined" 
              className={
                this.onButtonClassNameSelect(
                  index, 
                  currQuestion, 
                  answeredQuestions, 
                  questionsStatus
                )
              }
              onClick={() => this.onQuestionSummaryClick(index)}
            >
              {index + 1}
            </Button>
          )}
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