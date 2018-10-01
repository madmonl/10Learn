let answeredQuestions = [], 
    answersStatus = [], 
    questionsStatus = [];

var i = 0;
for (;i < 10; i++) {
  answeredQuestions[i] = false;
  questionsStatus[i] = 'being_answered';
  answersStatus[i] = -1;
}

export default [
  {
    id: '1',
    currQuestion: 0, 
    answeredQuestions: answeredQuestions,
    questionsStatus: questionsStatus,
    answersStatus: answersStatus,
    questions: [{
      question: '1 + 2 = ?',
      solutions: [
        1,
        3,
        4
      ],
      index: 1
    }],
    selectedSubjects: [
      'חיבור',
      'חיסור'
    ]
  }, {
    id: '2',
    currQuestion: 0, 
    answeredQuestions: answeredQuestions,
    questionsStatus: questionsStatus,
    answersStatus: answersStatus,
    questions: [{
      question: '4 + 3 = ?',
      solutions: [
        5,
        6,
        7
      ],
      index: 2
    }],
    selectedSubjects: [
      'כפל',
      'חילוק'
    ]
  }
] 
