import React from 'react';
import { generateExam } 
from '../Generators/exam';

export default ({ subjects }) => {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  switch (subject) {
    case 'חיבור':
      return generateExam('חיבור');

    case 'חיסור': 
      return generateExam('חיסור');

    case 'חיבור שברים': 
      return generateExam('חיבור שברים');

    default:
      'Error: No such exam subject.'
  }
}