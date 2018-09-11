import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumbersNavigation from './NumbersNavigation';
import SubmitExamModal from './SubmitExamModal';




export const ExamUpperNavigation = props => {
  const { questions, currQuestion, answeredQuestions, questionsStatus } = props
  return(
    <div className="exam__upper-footer">
      <NumbersNavigation 
        questions={questions}
        currQuestion={currQuestion}
        answeredQuestions={answeredQuestions}
        questionsStatus={questionsStatus}
      />
      <SubmitExamModal />
    </div>
  );
}
const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    currQuestion: state.exam.currQuestion,
    answeredQuestions: state.exam.answeredQuestions,
    questionsStatus: state.exam.questionsStatus
});

export default connect(mapStateToProps)(ExamUpperNavigation)