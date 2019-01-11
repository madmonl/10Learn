const filterReducerDefaultState = {
  id: '',
  sortBy: 'ציון גבוה קודם',
  sortByFilers: [
    'ציון גבוה קודם',
    'ציון נמוך קודם',
    'תאריך'
  ]
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