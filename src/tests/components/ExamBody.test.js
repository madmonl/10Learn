import React from 'react';
import { shallow } from 'enzyme';
import { ExamBody } from '../../components/ExamBody';
import exams from '../fixtures/exams'

let wrapper, dispatchChangeQuestion, dispatchMarkQuestion, dispatchSetAnswer;

beforeEach(() => {
  dispatchChangeQuestion = jest.fn();
  dispatchMarkQuestion = jest.fn();
  dispatchSetAnswer = jest.fn();
  wrapper = shallow(
    <ExamBody 
      dispatchChangeQuestion={dispatchChangeQuestion}
      dispatchMarkQuestion={dispatchMarkQuestion}
      dispatchSetAnswer={dispatchSetAnswer}
      questions={exams[0].questions} 
      currQuestion={0}
      questionsStatus={[]}
      answersStatus={[]}
    />
  );
});

test('should render ExamBody correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call solutions` on click correctly', () => {
  wrapper.find('.exam__answers').children().forEach((node) => {
    node.prop('onClick')();
  });
  expect(dispatchChangeQuestion).toHaveBeenCalledTimes(3);
  expect(dispatchMarkQuestion).toHaveBeenCalledTimes(3);
  expect(dispatchSetAnswer).toHaveBeenCalledTimes(3);
});