let answeredQuestions = [];
var i = 0;
for (i = 1; i < 10; i++) {
  answeredQuestions[i] = false;
}

let examState = { 
  currQuestion: 0, 
  answeredQuestions: answeredQuestions
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
        default:
            return state;
    }
};