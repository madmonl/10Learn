const filterReducerDefaultState = {
  id: '',
  sortBy: 'ציון גבוה קודם'
}

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "CHANGE_ID":
      return { ...state, id: action.id }
    case "CHANGE_SORT_BY":
      return { ...state, sortBy: action.sortBy }
    default: 
      return state
  }
}