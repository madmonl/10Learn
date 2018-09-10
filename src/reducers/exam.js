let answeredQuestions = [], 
    answersStatus = [], 
    questionsStatus = [];

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
        case 'CHANGE_NAVIGATION_BUTTON_COLOR':
          answeredQuestions[action.index] = true;
          return {
            ...state,
            answeredQuestions
          };     
        case 'MARK_QUESTION':
          answeredQuestions[action.index] = true;
          return {
            ...state,
            answeredQuestions
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
          questionsStatus[action.index] = action.status
          return {
            ...state,
            questionsStatus                        
          }
        case 'CLEAR_QUESTIONS_STATUS':
          for (i = 0; i < 10; i++) {
            questionsStatus[i] = 'being_answered';
          }
          return {
            ...state,
            questionsStatus                        
          }
        case 'SET_ANSWER':
          answersStatus[action.index] = action.answer
          return {
            ...state,
            answersStatus
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
        default:
            return state;
    }
};