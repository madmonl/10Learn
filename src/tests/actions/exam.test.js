import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { dispatchChangeQuestion, dispatchSetQuestions, dispatchMarkQuestion,
 dispatchCleanMarkedQuestions, dispatchChangeExam, dispatchChangeQuestionStatus,
 dispatchSetAnswer, dispatchClearQuestionsStatus,dispatchClearAnswersStatus,
 dispatchSetGrade, dispatchSetAnswersStatusToNone, dispatchSetSelectedSubjects,
 setExams, startSetExams, addExam, startAddExam } from '../../actions/exam';
import exams from '../fixtures/exams';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'test-uid';

beforeEach((done) => {
    const examsData = {};
    exams.forEach(({ 
      id, 
      currQuestion, 
      answeredQuestions, 
      questionsStatus, 
      answersStatus, 
      questions,
      selectedSubjects }) => {
        examsData[id] = { 
          id, 
          currQuestion, 
          answeredQuestions, 
          questionsStatus, 
          answersStatus, 
          questions,
          selectedSubjects 
        } 
    });
    // If we will not use done the tests will start 
    // immediately
    db.ref(`users/${uid}/exams`).set(examsData).then(() => done());
});

test('should setup change question action', () => {
  const action = dispatchChangeQuestion(0);
  expect(action).toEqual({
    type: 'CHANGE_QUESTION',
    currQuestion: 0
  });
});

test('should setup set questions action', () => {
  const action = dispatchSetQuestions(exams[0].questions);
  expect(action).toEqual({
    type: 'SET_QUESTIONS',
    questions: exams[0].questions
  });
});

test('should setup mark question action', () => {
  const action = dispatchMarkQuestion(0);
  expect(action).toEqual({
    type: 'MARK_QUESTION',
    index: 0
  });
});

test('should setup clean marked questions action', () => {
  const action = dispatchCleanMarkedQuestions();
  expect(action).toEqual({
    type: 'CLEAN_MARKED_QUESTIONS'
  });
});

test('should setup change exam action', () => {
  const action = dispatchChangeExam(exams[0]);
  expect(action).toEqual({
    type: 'CHANGE_EXAM',
    exam: exams[0]
  });
});

test('should set change question status action', () => {
  const action = dispatchChangeQuestionStatus(0, 'correct');
  expect(action).toEqual({
    type: 'CHANGE_QUESTION_STATUS',
    index: 0,
    status: 'correct'
  });
});

test('should setup set answer action', () => {
  const action = dispatchSetAnswer(0, 1);
  expect(action).toEqual({
    type: 'SET_ANSWER',
    index: 0,
    answer: 1
  });
});

/////////////////////////////////////////////////////////////////

test('should setup ClearQuestionsStatus action', () => {
  const action = dispatchClearQuestionsStatus();
  expect(action).toEqual({ type: 'CLEAR_QUESTIONS_STATUS' });
});

test('should setup ClearAnswersStatus action', () => {
  const action = dispatchClearAnswersStatus(0, 1);
  expect(action).toEqual({ type: 'CLEAR_ANSWERS_STATUS' });
});

test('should setup SetGrade action', () => {
  const action = dispatchSetGrade(0);
  expect(action).toEqual({
    type: 'SET_GRADE',
    grade: 0
  });
});

test('should setup SetAnswersStatusToNone action', () => {
  const action = dispatchSetAnswersStatusToNone();
  expect(action).toEqual({
    type: 'SET_ANSWERS_STATUS_TO_NONE'
  });
});

test('should setup SetSelectedSubjects action', () => {
  const action = dispatchSetSelectedSubjects(exams[0].selectedSubjects);
  expect(action).toEqual({
    type: 'SET_SELECTED_SUBJECTS',
    selectedSubjects: exams[0].selectedSubjects
  });
});

test('should setup setExams action', () => {
  const action = setExams(exams[0]);
  expect(action).toEqual({
    type: 'SET_EXAMS',
    prevExams: exams[0]
  });
});

test('should setup addExam action', () => {
  const action = addExam(exams[0]);
  expect(action).toEqual({
    type: 'ADD_EXAM',
    exam: exams[0]
  });
});

test('should setup startAddExam action', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startAddExam()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXAM',
            exam: {
              id: expect.any(String),
              questions: {}, 
              answersStatus: [],
              questionsStatus: [],
              selectedSubjects: [],
              grade: 0
            }
        });
        return db.ref(`users/${uid}/exams/${actions[0].exam.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({ grade: 0 });
        done();
    });
});

test('should fetch the exams from firebase', () => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startSetExams()).then((action) => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXAMS',
            prevExams: exams
        });
    });
});
