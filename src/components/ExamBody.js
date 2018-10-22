import React, { Fragment, Component } from 'react';
import MathJax from 'react-mathjax';
import { dispatchChangeQuestion, dispatchMarkQuestion, dispatchSetAnswer } from '../actions/exam';
import { connect } from 'react-redux';

export class ExamBody extends Component {
  constructor (props) {
    super(props);
    this.solutionClassName = this.solutionClassName.bind(this);
    this.onSubmitQuestion = this.onSubmitQuestion.bind(this);
  }

  onSubmitQuestion = (index, answer) => {
    this.props.dispatchChangeQuestion((index + 1) % 10);
    this.props.dispatchMarkQuestion(index);
    this.props.dispatchSetAnswer(index, answer);
  } 
  
  solutionClassName = (index, questions, currQuestion, questionsStatus, answersStatus) => {
    // one of:
    // "exam__answer-item" when still in exam - clickable.
    // "exam__answer-correct" not clickable - correct solution only.
    // "exam__answer-mistake" only a mistaken solution that was chosen.
    // or exam finished and
    // "exam__answer-default" not clickable not chosen, not correct answer.
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
    const { questions, currQuestion, questionsStatus, answersStatus } = this.props;
    
    return (
      <div>
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
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
    dispatchMarkQuestion: (index) => dispatch(dispatchMarkQuestion(index)),
    dispatchSetAnswer: (index, answer) => dispatch(dispatchSetAnswer(index, answer))
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    currQuestion: state.exam.currQuestion,
    questionsStatus: state.exam.questionsStatus,
    answersStatus: state.exam.answersStatus,
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ExamBody);
