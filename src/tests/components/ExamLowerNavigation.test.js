import React from 'react';
import { shallow } from 'enzyme';
import { ExamLowerNavigation } from '../../components/ExamLowerNavigation';
import exams from '../fixtures/exams'
import { Button } from '@material-ui/core/';

let wrapper, dispatchChangeQuestion;

beforeEach(() => {
  dispatchChangeQuestion = jest.fn();
  wrapper = shallow(
    <ExamLowerNavigation
      dispatchChangeQuestion={dispatchChangeQuestion}
      questions={exams[0].questions} 
      currQuestion={0}
      classes={{}}
    />
  );
});

test('should render ExamLowerNavigation correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call prev question on click correctly', () => {
  wrapper.find(Button).at(0).prop('onClick')();
  expect(dispatchChangeQuestion).toHaveBeenCalledWith(9);
});

test('should call next question on click correctly', () => {
  wrapper.find(Button).at(1).prop('onClick')();
  expect(dispatchChangeQuestion).toHaveBeenCalledWith(1);
});