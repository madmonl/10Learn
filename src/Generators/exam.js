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
   wrongAnswer1, wrongAnswer2, a, b, c, d, whole, 
   whole1, whole2, remainder, top1, top2, bottom1, bottom2;
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
    if (a === b || c === d) {
      continue;
    }
    top = a*d + b*c;
    bottom = b*d;
    divideBy = gcd(top, bottom);
    top = top / divideBy;
    bottom = bottom / divideBy;
    if (bottom <= top) {
      whole = Math.floor(top / bottom),
      remainder = top % bottom;
      remainder !== 0 
        ? correctSolution = `${whole}\\frac{${remainder}}{${bottom}}` 
        : correctSolution = `${whole}`
      
    } else {
      correctSolution  = `${top} \\over ${bottom}`;
    }
    whole1 = generateRandom(0, 5);
    whole2 = generateRandom(0, 5);
    top1 = generateRandom(1, 9);
    top2 = generateRandom(1, 9);
    bottom1 = generateRandom(1, 9);
    bottom2 = generateRandom(1, 9);
    if (top1 > bottom1) top1 = [bottom1, bottom1 = top1][0];
    if (top2 > bottom2) top2 = [bottom2, bottom2 = top2][0];

    whole1 !== 0 
      ? wrongAnswer1 = `${whole1}\\frac{${top1}}{${bottom1}}`
      : wrongAnswer1 = `\\frac{${top1}}{${bottom1}}`
    whole2 !== 0 
      ? wrongAnswer2 = `${whole2}\\frac{${top2}}{${bottom2}}`
      : wrongAnswer2 = `\\frac{${top2}}{${bottom2}}`
    // Making sure solutions are the different.
    if (wrongAnswer1 !== wrongAnswer2 &&
        wrongAnswer1 !== correctSolution &&
        wrongAnswer2 !== correctSolution &&
        top < 10 && bottom < 10 &&
        whole1 !== whole2 && top1 !== bottom1 &&
        top2 !== bottom2
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