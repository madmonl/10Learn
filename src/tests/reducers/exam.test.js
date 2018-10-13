import examReducer, { examState } from '../../reducers/exam';
import exams from '../fixtures/exams';

test('should setup default exam values', () => {
  const state = examReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(examState);
});

test('change question', () => {
  const action = {
      type: 'CHANGE_QUESTION',
      currQuestion: 1
  };

  const state = examReducer(undefined, action);
  expect(state.currQuestion).toBe(1);
});

test('set questions', () => {
  const action = {
      type: 'SET_QUESTIONS',
      questions: exams[0].questions
  };

  const state = examReducer(undefined, action);
  expect(state.questions).toEqual(exams[0].questions);
});

test('clean marked questions', () => {
  const action = {
      type: 'CLEAN_MARKED_QUESTIONS',
  };

  const state = examReducer({ 
    ...examState, 
    answeredQuestions: [
      true,
      ...examState.answeredQuestions.slice(1, examState.answeredQuestions.length)
    ]
  }, action);
  state.answeredQuestions.forEach((answered) => {
    expect(answered).toBe(false);
  })
});

test('change question status', () => {
  const action = {
      type: 'CHANGE_QUESTION_STATUS',
      index: 0,
      status: 'correct'
  };

  const state = examReducer(undefined, action);
  expect(state.questionsStatus[0]).toBe('correct');
});

test('clean marked questions', () => {
  const action = {
      type: 'CLEAN_MARKED_QUESTIONS',
  };

  const state = examReducer({ 
    ...examState, 
    answeredQuestions: [
      true,
      ...examState.answeredQuestions.slice(1, examState.answeredQuestions.length)
    ]
  }, action);
  state.answeredQuestions.forEach((answered) => {
    expect(answered).toBe(false);
  })
});