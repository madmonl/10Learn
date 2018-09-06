import React from 'react';



const addition = () => {
  const a = Math.floor(Math.random() * 10),
        b = Math.floor(Math.random() * 10);
  const correctSolution = a + b;
  let wrongAnswer1, wrongAnswer2;
  // Generating randomly the place of the correct answer
  const correctIndex = Math.floor(Math.random() * 3)
  const incorrecIindex1 = (correctIndex + 1) % 3;
  const incorrecIindex2 = (incorrecIindex1 + 1) % 3;
  const solotions = [];
  while (true) {
    wrongAnswer1 = Math.floor(Math.random() * 20);
    wrongAnswer2 = Math.floor(Math.random() * 20);
    if (wrongAnswer1 !== correctSolution && wrongAnswer2 !== correctSolution)  {
      solutions[correctIndex] = correctSolution;
      solutions[incorrecIindex1] = wrongAnswer1;
      solutions[incorrecIindex2] = wrongAnswer2;
      break;
    }
  }  
  
  return {
    question: `${a} + ${b} = ?`,
    solutions: solutions,
    index: correctIndex
  }
}

const subtraction = () => {
  const a = Math.floor(Math.random() * 10),
        b = Math.floor(Math.random() * 10);
  const correctSolution = a - b;
  let wrongAnswer1, wrongAnswer2;
  // Generating randomly the place of the correct answer
  const correctIndex = Math.floor(Math.random() * 3)
  const incorrecIindex1 = (correctIndex + 1) % 3;
  const incorrecIindex2 = (incorrecIindex1 + 1) % 3;
  const solutions = [];
  while (true) {
    wrongAnswer1 = Math.floor(Math.random() * 20);
    wrongAnswer2 = Math.floor(Math.random() * 20);
    if (wrongAnswer1 !== correctSolution && wrongAnswer2 !== correctSolution)  {
      solutions[correctIndex] = correctSolution;
      solutions[incorrecIindex1] = wrongAnswer1;
      solutions[incorrecIindex2] = wrongAnswer2;
      console.log('here');
      break;
    }
  }  
  
  return {
    question: `${a} - ${b} = ?`,
    solutions: solutions,
    index: correctIndex
  }
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