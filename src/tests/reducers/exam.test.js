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

  const state = examReducer(undefined, action);
  state.answeredQuestions.forEach((answered) => {
    expect(status).toBe(false);
  })
});

