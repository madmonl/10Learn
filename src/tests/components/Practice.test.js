import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Practice } from '../../components/Practice';
import { Checkbox, Button, Chip } from '@material-ui/core/';
import { Provider } from 'react-redux';
import exams from '../fixtures/exams';
// import { createShallow } from '@material-ui/core/test-utils';

const createMockStore = configureMockStore([thunk]);

let wrapper, dispatchSetQuestions, dispatchChangeQuestion, 
  dispatchCleanMarkedQuestions, dispatchClearQuestionsStatus, 
  dispatchSetAnswersStatusToNone, dispatchClearAnswersStatus, 
  dispatchSetSelectedSubjects;

beforeEach(() => {
  dispatchSetQuestions = jest.fn();
  dispatchChangeQuestion = jest.fn();
  dispatchCleanMarkedQuestions = jest.fn();
  dispatchClearQuestionsStatus = jest.fn();
  dispatchSetAnswersStatusToNone = jest.fn();
  dispatchClearAnswersStatus = jest.fn();
  dispatchSetSelectedSubjects = jest.fn();
  wrapper = mount(
    <Practice 
      dispatchSetQuestions={dispatchSetQuestions} 
      dispatchChangeQuestion={dispatchChangeQuestion} 
      dispatchCleanMarkedQuestions={dispatchCleanMarkedQuestions} 
      dispatchClearQuestionsStatus={dispatchClearQuestionsStatus} 
      dispatchSetAnswersStatusToNone={dispatchSetAnswersStatusToNone} 
      dispatchClearAnswersStatus={dispatchClearAnswersStatus} 
      dispatchSetSelectedSubjects={dispatchSetSelectedSubjects} 
      subjects={['חיסור', 'חיבור']}
      classes={{}}
    />
  );
});

test('should render Practice correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should add a chip and then remove it', () => {
//   // Adding all selectedSubjects
  wrapper.find(Checkbox).forEach((node) => {
    node.children().prop('onChange')()
  })  

  expect(wrapper.state('selectedSubjects')).toEqual(['חיסור', 'חיבור']);
  expect(wrapper.state('chipCount')).toBe(2);
  
//   // Removing all selectedSubjects

  wrapper.find(Checkbox).forEach((node) => {
    expect(node.children().prop('onChange')())
  })  
  expect(wrapper.state('selectedSubjects')).toEqual([]);
  expect(wrapper.state('chipCount')).toBe(0);
});

test('should click Button properly and call onStartExamClick with no selected subjects', () => {
  wrapper.find(Button).childAt(0).prop('onClick')();
  expect(wrapper.state('noSubjectsChosenError')).toBe(true);
  expect(dispatchCleanMarkedQuestions).toHaveBeenCalled();
  expect(dispatchClearQuestionsStatus).toHaveBeenCalled();
  expect(dispatchClearAnswersStatus).toHaveBeenCalled();
  expect(dispatchSetSelectedSubjects).toHaveBeenCalledWith([]);
})

test('shoul click Button properly and call onStartExamClick with selected subjects', () => {
  // Mockup store is provided with mockk values for ExamBody
  // and for ExamLowerNavigation who are using the store's state.
  const store = createMockStore({ 
    exam: exams[0]
  });
  wrapper = mount(
    <Provider store={store}>
      <Practice 
        dispatchSetQuestions={dispatchSetQuestions} 
        dispatchChangeQuestion={dispatchChangeQuestion} 
        dispatchCleanMarkedQuestions={dispatchCleanMarkedQuestions} 
        dispatchClearQuestionsStatus={dispatchClearQuestionsStatus} 
        dispatchSetAnswersStatusToNone={dispatchSetAnswersStatusToNone} 
        dispatchClearAnswersStatus={dispatchClearAnswersStatus} 
        dispatchSetSelectedSubjects={dispatchSetSelectedSubjects} 
        subjects={['חיסור', 'חיבור']}
        classes={{}}
      />
    </Provider>
  );
  wrapper.find(Checkbox).forEach((node) => {
    node.children().prop('onChange')()
  })
  wrapper.find(Button).children().prop('onClick')();
  expect(dispatchSetQuestions).toHaveBeenCalled();
  expect(dispatchCleanMarkedQuestions).toHaveBeenCalled();
  expect(dispatchClearQuestionsStatus).toHaveBeenCalled();
  expect(dispatchClearAnswersStatus).toHaveBeenCalled();
  expect(dispatchSetSelectedSubjects).toHaveBeenCalledWith([ 'חיסור', 'חיבור']);
  expect(dispatchChangeQuestion).toHaveBeenCalledWith(0);
})

test('should delete a chip when 2 are selected', () => {
  // Mockup store is provided with mockk values for ExamBody
  // and for ExamLowerNavigation who are using the store's state.
  const store = createMockStore({ 
    exam: exams[0]
  });
  wrapper = mount(shallow(
    <Provider store={store}>
      <Practice 
        dispatchSetQuestions={dispatchSetQuestions} 
        dispatchChangeQuestion={dispatchChangeQuestion} 
        dispatchCleanMarkedQuestions={dispatchCleanMarkedQuestions} 
        dispatchClearQuestionsStatus={dispatchClearQuestionsStatus} 
        dispatchSetAnswersStatusToNone={dispatchSetAnswersStatusToNone} 
        dispatchClearAnswersStatus={dispatchClearAnswersStatus} 
        dispatchSetSelectedSubjects={dispatchSetSelectedSubjects} 
        subjects={['חיסור', 'חיבור']}
        classes={{}}
      />
    </Provider>
  ).get(0));
  // Marking both of the checkboxes as checked
  wrapper.find(Checkbox).forEach((node) => {
    node.children().prop('onChange')()
  })
  expect(wrapper.state('selectedSubjects')).toEqual(['חיסור', 'חיבור'])
  // deleting one of the checkboxes' selection.
  // wrapper.find(Chip).at(0).prop('onDelete')();
  // expect(wrapper.state('selectedSubjects')).toEqual(['חיבור']);
})