export default (exams, { id, sortBy}) => {
  return (
    exams.filter(exam => exam.id.includes(id))
      .sort((examA, examB) => {
        if (sortBy === 'ציון גבוה קודם') 
          return examA.grade < examB.grade ? 1 : -1
        else if (sortBy === 'ציון נמוך קודם')
          return examA.grade < examB.grade ? -1 : 1
      })
  )
} 