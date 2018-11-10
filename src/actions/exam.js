
import db from '../firebase/firebase';

// sets the currQuestion property to the new question index.
// gets a number between 0 to 9.
export const dispatchChangeQuestion = currQuestion => ({
  type: 'CHANGE_QUESTION',
  currQuestion
});

// sets the store's questions property to the questions
// generated by the QuestionGenerator component.
export const dispatchSetQuestions = questions => ({
  type: 'SET_QUESTIONS',
  questions
});

// setting the indexed question in answeredQuestions to
// true, so we can color it as answered in the numbersNavBar.
export const dispatchMarkQuestion = index => ({
  type: 'MARK_QUESTION',
  index
});

// after exam submition we set all answeredQuestions to false
// so we can mark their colors to either red or green.
export const dispatchCleanMarkedQuestions = index => ({
  type: 'CLEAN_MARKED_QUESTIONS'
});

// changing the state.exam property so the PrevExams modal
// would easily be able to display the selected exam via
// <Exam /> component since it relays on state.exam property
export const dispatchChangeExam = exam => ({
  type: 'CHANGE_EXAM',
  exam
});

// changing the questionsStatus[index] so we can display the
// correct colors on numbersNavBar and solutions.
// status is one of:
// 1. 'being_enswered'
// 2. 'correct'
// 3. 'mistake'
export const dispatchChangeQuestionStatus = (index, status) => ({
  type: 'CHANGE_QUESTION_STATUS',
  index, 
  status
});

// sets the answersStatus[index] to one of 0, 1 or 2
// so we know the user's grade and such eventually.
export const dispatchSetAnswer = (index, answer) => ({
  type: 'SET_ANSWER',
  index,
  answer
});

// sets all questionsStatuses to 'being_answerd' in order of post exam
// color deletion
export const dispatchClearQuestionsStatus = () => ({
  type: 'CLEAR_QUESTIONS_STATUS'
});

export const dispatchClearAnswersStatus = () => ({
  type: 'CLEAR_ANSWERS_STATUS'
});

// sets grade property to the users grade.
export const dispatchSetGrade = grade => ({
  type: 'SET_GRADE',
  grade
});

// sets answersStatus to -1.
export const dispatchSetAnswersStatusToNone = () => ({
  type: 'SET_ANSWERS_STATUS_TO_NONE'
});

export const dispatchSetSelectedSubjects = selectedSubjects => ({
  type: 'SET_SELECTED_SUBJECTS',
  selectedSubjects
})

export const dispatchSetAnswersStatistics = stats => ({
  type:'SET_ANSWERS_STATISTICS',
  stats
});


export const setExams = prevExams => ({
  type: 'SET_EXAMS',
  prevExams
});

export const startSetExams = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/exams`).once('value').then((snapshot) => {
            const exams = [];
            
            snapshot.forEach((childSnapshot) => {
                exams.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExams(exams));
        });
    };
};

// ADD_EXPENSE
export const addExam = exam => ({
  type: 'ADD_EXAM',
  exam
});

export const startAddExam = (examData = {}) => {
  return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
          questions = {}, 
          answersStatus = [],
          questionsStatus = [],
          selectedSubjects = [],
          grade = 0,
          stats = {}
      } = examData;
      const exam = { questions, answersStatus, questionsStatus, selectedSubjects, grade, stats };

      return db.ref(`users/${uid}/exams`).push(exam).then((ref) => {
        dispatch(addExam({
          id: ref.key,
          ...exam
        }));
      });
  };
};
  

// ADD_EXPENSE
export const removeExam = id => ({
  type: 'REMOVE_EXAM',
  id
});

export const startRemoveExam = id => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/exams/${id}`).remove().then(() => {
            dispatch(removeExam(id));
        });
    };
};