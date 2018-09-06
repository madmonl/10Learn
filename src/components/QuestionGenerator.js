import React from 'react';


const additionSubtractionHelper = type => {
  const a = Math.floor(Math.random() * 10),
        b = Math.floor(Math.random() * 10);
  let correctSolution;
  if (type === 'addition') {
    correctSolution = a + b;
  } else if (type === 'subtraction') {
    correctSolution = a - b;
  } else {
    throw 'Error: incorrect exercise type @QuestionGenerator.';
  }

  let wrongAnswer1, wrongAnswer2;
  // Generating randomly the place of the correct answer
  const correctIndex = Math.floor(Math.random() * 3)
  const incorrecIindex1 = (correctIndex + 1) % 3;
  const incorrecIindex2 = (incorrecIindex1 + 1) % 3;
  const solutions = [];
  while (true) {
    wrongAnswer1 = Math.floor(Math.random() * 6) - 3 + correctSolution;
    wrongAnswer2 = Math.floor(Math.random() * 6) - 3 + correctSolution;
    // Making sure solutions are the different.
    if (wrongAnswer1 !== wrongAnswer2 &&
        wrongAnswer1 !== correctSolution &&
        wrongAnswer2 !== correctSolution 
       )  {
      solutions[correctIndex] = correctSolution;
      solutions[incorrecIindex1] = wrongAnswer1;
      solutions[incorrecIindex2] = wrongAnswer2;
      break;
    }
  }  

  switch (type) {
    case 'addition':
      return {
        question: `${a} + ${b} = ?`,
        solutions: solutions,
        index: correctIndex
      }
    case 'subtraction':
      return {
        question: `${a} - ${b} = ?`,
        solutions: solutions,
        index: correctIndex
      }
    default:
      throw 'Error: incorrect exercise type @QuestionGenerator.';
  }
}

const addition = () => {  
  return additionSubtractionHelper('addition');
}

const subtraction = () => {
  return additionSubtractionHelper('subtraction');
}


export default ({ subjects }) => {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  switch (subject) {
    case 'חיבור':
      return addition();

    case 'חיסור': 
      return subtraction();

    default:
      'Error: No such exam subject.'
  }
}