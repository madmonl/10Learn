import React from 'react';
import { shallow } from 'enzyme';
import { ExamUpperNavigation } from '../../components/ExamUpperNavigation';

test('should render ExamUpperNavigation correctly', () => {
  const wrapper = shallow(<ExamUpperNavigation />);
  expect(wrapper).toMatchSnapshot();
});