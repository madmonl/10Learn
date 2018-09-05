let materialDefaults = { 
  tabs: [
    'תרגול',
    'מבחנים קודמים'
  ],
  currTab: 'תרגול',
  subjects: [
    'חיבור',
    'חיסור'
  ]
};

export default (state = materialDefaults, action) => {
    switch (action.type) {
        case 'HEADER_TABS_NAVIGATION':
            return {
              ...state,
              currTab: action.currTab
            };
              
        default:
            return state;
    }
};
