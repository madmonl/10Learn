import { decimalToFraction, gcd } from './helper-functions';

export const generateExam = type => {        
  switch (type) {
    case 'חיבור':
      return generateExamAddition()

    case 'חיסור':
      return generateExamSubtraction()
      
    case 'חיבור שברים':
      return generateExamFractionsAddition();
      
    default:
      throw 'Error: incorrect exercise type @QuestionGenerator.';
  }
}

const generateExamAddition = () => ({});
const generateExamSubtraction = () => ({});

const generateExamFractionsAddition = () => {
  let top, bottom, correctSolution, divideBy,
   wrongAnswer1, wrongAnswer2, a, b, c, d;
  // Generating randomly the place of the correct answer
  const correctIndex = Math.floor(Math.random() * 3),
        incorrecIindex1 = (correctIndex + 1) % 3,
        incorrecIindex2 = (incorrecIindex1 + 1) % 3,
        solutions = [];

  while (true) {
    // Generating 4 numbers in the range of 1 -> 9
    a = Math.floor(Math.random() * 9 + 1),
    b = Math.floor(Math.random() * 9 + 1),
    c = Math.floor(Math.random() * 9 + 1),
    d = Math.floor(Math.random() * 9 + 1);
    top = a*d + b*c;
    bottom = b*d;
    divideBy = gcd(top, bottom);
    top = top / divideBy;
    bottom = bottom / divideBy;
    correctSolution  = `${top} \\over ${bottom}`;
    wrongAnswer1 = `${generateRandom(1, 9)} \\over ${generateRandom(1, 9)}`;
    wrongAnswer2 = `${generateRandom(1, 9)} \\over ${generateRandom(1, 9)}`;
    // Making sure solutions are the different.
    if (wrongAnswer1 !== wrongAnswer2 &&
        wrongAnswer1 !== correctSolution &&
        wrongAnswer2 !== correctSolution &&
        top < 10 && bottom < 10 
       )  {
      solutions[correctIndex] = correctSolution;
      solutions[incorrecIindex1] = wrongAnswer1;
      solutions[incorrecIindex2] = wrongAnswer2;
      break;
    }
  }

  return {
    question: `{ \\frac{${a}}{${b}} + \\frac{${c}}{${d}} } = ?`,
    solutions: solutions,
    index: correctIndex
  }
};

const generateRandom = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1) + a);
};