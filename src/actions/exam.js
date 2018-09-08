export const dispatchChangeQuestion = currQuestion => ({
  type: 'CHANGE_QUESTION',
  currQuestion
});

export const dispatchSetQuestions = questions => ({
  type: 'SET_QUESTIONS',
  questions
});

export const dispatchChangeButtonColor = index => {
  type: 'CHANGE_NAVIGATION_BUTTON_COLOR',
  index
}