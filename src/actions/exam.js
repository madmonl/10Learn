export const dispatchChangeQuestion = currQuestion => ({
  type: 'CHANGE_QUESTION',
  currQuestion
});

export const dispatchSetQuestions = questions => ({
  type: 'SET_QUESTIONS',
  questions
});

export const dispatchChangeButtonColor = index => ({
  type: 'CHANGE_NAVIGATION_BUTTON_COLOR',
  index
});

export const dispatchMarkQuestion = index => ({
  type: 'MARK_QUESTION',
  index
});

export const dispatchCleanMarkedQuestions = index => ({
  type: 'CLEAN_MARKED_QUESTIONS'
});

export const dispatchChangeQuestionStatus = (index, status) => ({
  type: 'CHANGE_QUESTION_STATUS',
  index, 
  status
});

export const dispatchSetAnswer = (index, answer) => ({
  type: 'SET_ANSWER',
  index,
  answer
});

export const dispatchClearQuestionsStatus = () => ({
  type: 'CLEAR_QUESTIONS_STATUS'
});

export const dispatchSetGrade = grade => ({
  type: 'SET_GRADE',
  grade
});