import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { SubmitExamModal } from '../../components/SubmitExamModal';
import { Modal, Button } from '@material-ui/core/';
import { Provider } from 'react-redux';
import exams from '../fixtures/exams';

let wrapper, dispatchSetGrade, dispatchChangeQuestion,
  dispatchCleanMarkedQuestions, dispatchChangeQuestionStatus, 
  startAddExam;

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  dispatchSetGrade = jest.fn();
  dispatchChangeQuestion = jest.fn();
  dispatchCleanMarkedQuestions = jest.fn();
  dispatchChangeQuestionStatus = jest.fn();
  startAddExam = jest.fn();
  wrapper = mount(
    <SubmitExamModal
      dispatchSetGrade={dispatchSetGrade} 
      dispatchChangeQuestion={dispatchChangeQuestion} 
      dispatchCleanMarkedQuestions={dispatchCleanMarkedQuestions} 
      dispatchChangeQuestionStatus={dispatchChangeQuestionStatus}
      startAddExam={startAddExam} 
      questions={exams[0].questions}
      answeredQuestions={exams[0].answeredQuestions}
      questionsStatus={exams[0].questionsStatus}
      answersStatus={exams[0].answersStatus}
      grade={exams[0].grade}
      classes={{}}
    />
  );
});

test('should render SubmitExamModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should close modal', () => {
  expect(wrapper.state('open')).toBe(false)
  wrapper.setState({ open: true })
  expect(wrapper.state('open')).toBe(true)
  wrapper.find(Modal).prop('onClose')();
  expect(wrapper.state('open')).toBe(false)
})

test('should clean some exam values from store so we can spectate exam solutions', () => {
  const store = createMockStore({ 
    currQuestion: 1,
    exams: exams
  });
  wrapper = mount(shallow(
    <Provider store={store}>
      <SubmitExamModal
        dispatchSetGrade={dispatchSetGrade} 
        dispatchChangeQuestion={dispatchChangeQuestion} 
        dispatchCleanMarkedQuestions={dispatchCleanMarkedQuestions} 
        dispatchChangeQuestionStatus={dispatchChangeQuestionStatus}
        startAddExam={startAddExam} 
        questions={exams[0].questions}
        answeredQuestions={exams[0].answeredQuestions}
        questionsStatus={exams[0].questionsStatus}
        answersStatus={exams[0].answersStatus}
        grade={exams[0].grade}
        questions={exams[0].questions}
        answersStatus={exams[0].answersStatus}
        classes={{}}
      />
    </Provider>
  ).get(0));
  wrapper.setState({ open: true })
  wrapper.update();
  wrapper.find(Button).at(1).prop('onClick')();
  wrapper.update();
  expect(wrapper.state('open')).toBe(false);
  expect(dispatchCleanMarkedQuestions).toHaveBeenCalled();
  expect(dispatchChangeQuestion).toHaveBeenCalledWith(0);
});

test('testing exam submition', () => {
  wrapper.find(Button).at(0).prop('onClick')();
  expect(dispatchChangeQuestionStatus).toHaveBeenCalledTimes(10);
});

test('componentWillUpdate', () => {
  let newQuestionsStatus = [];
  var i = 0;
  for (;i < 10; i++) {
    newQuestionsStatus[i] = 'correct';
  };
  wrapper.setProps({ questionsStatus: newQuestionsStatus });
    expect(dispatchSetGrade).toHaveBeenCalledWith(100);
})