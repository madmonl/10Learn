export default (state = { tokens: 0}, action) => {
  switch(action.type) {
    case 'CHANGE_TOKENS':
      return {
        ...state,
        tokens: action.tokens
      }
  }
}