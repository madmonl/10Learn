let answeredQuestions = [], 
    answersStatus = [], 
    questionsStatus = [],
    prevExams = [];

var i = 0;
for (;i < 10; i++) {
  answeredQuestions[i] = false;
  questionsStatus[i] = 'being_answered';
  answersStatus[i] = -1;
}

let examState = { 
  currQuestion: 0, 
  answeredQuestions: answeredQuestions,
  questionsStatus: questionsStatus,
  answersStatus: answersStatus
}

export default (state = examState, action) => {
    switch (action.type) {
        case 'CHANGE_QUESTION':
            return {
              ...state,
              currQuestion: action.currQuestion
            };
        case 'SET_QUESTIONS':
          const obj = {
            ...state,
            questions: action.questions
          };
          return obj;  
        case 'MARK_QUESTION':
          return {
            ...state,
            answeredQuestions: [
              ...state.answeredQuestions.slice(0, action.index),
              true,
              ...state.answeredQuestions.slice(action.index + 1)
            ]
          }
        case 'CLEAN_MARKED_QUESTIONS':
          for (i = 0; i < 10; i++) {
            answeredQuestions[i] = false;
          }
          return {
            ...state,
            answeredQuestions
          }
        case 'CHANGE_QUESTION_STATUS':
          // questionsStatus[action.index] = action.status
          return {
            ...state,
            questionsStatus: [
              ...state.questionsStatus.slice(0, action.index),
              action.status,
              ...state.questionsStatus.slice(action.index + 1)
            ]                       
          }
        case 'CLEAR_QUESTIONS_STATUS':
          for (i = 0; i < 10; i++) {
            questionsStatus[i] = 'being_answered';
          }
          return {
            ...state,
            questionsStatus                        
          }
        case 'CLEAR_ANSWERS_STATUS':
          for (i = 0; i < 10; i++) {
            answersStatus[i] = -1;
          }
          return {
            ...state,
            answersStatus                        
          }
        case 'SET_ANSWER':
          return {
            ...state,
            answersStatus: [
              ...state.answersStatus.slice(0, action.index),
              action.answer,
              ...state.answersStatus.slice(action.index + 1)
            ]
          }
        case 'SET_GRADE':
          return {
            ...state,
            grade: action.grade
          }
        case 'SET_ANSWERS_STATUS_TO_NONE':
          for (i = 0; i < 10; i++) {
            answersStatus[i] = -1;
          }
          return {
            ...state,
            answersStatus
          }
        case 'SET_SELECTED_SUBJECTS':
          return {
            ...state,
            selectedSubjects: action.selectedSubjects
          }
        case 'SET_EXAMS':
          return {
            ...state,
            prevExams: action.prevExams
          }
        case 'ADD_EXAM':
          return {
            ...state,
            prevExams: [
              ...state.prevExams,
              action.exam
            ]
          }
        case 'CHANGE_EXAM':
          return {
            ...state,
            ...action.exam
          }
        default:
            return state;
    }
};