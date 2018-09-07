export default (state = { currQuestion: 0 }, action) => {
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
        default:
            return state;
    }
};