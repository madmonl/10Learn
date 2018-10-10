import React from 'react';
import { shallow } from 'enzyme';
import { PrevExams } from '../../components/PrevExams';
import exams from '../fixtures/exams';
import { Chip } from '@material-ui/core/';


let wrapper, classes, dispatchChangeExam;

beforeEach(() => {
  dispatchChangeExam = jest.fn();
  wrapper = shallow(
    <PrevExams 
      dispatchChangeExam={dispatchChangeExam}
      classes={{}}
      prevExams={exams}
    />
  );
});

test('should render PrevExams correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should open the first exam in the modal', () => {
  wrapper.find('.prevExams').children().at(0).prop('onClick')();
  expect(wrapper.state('open')).toBe(true);
  expect(wrapper.state('modalExam')).toEqual(exams[0]);
  expect(dispatchChangeExam).toHaveBeenCalledWith(exams[0])
});

test('rendered Chip should match the selectedSubjects', () => {
  expect(wrapper.find(Chip).length).toBe(
    exams[0].selectedSubjects.length + exams[1].selectedSubjects.length)
});