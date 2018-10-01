import React from 'react';
import { shallow } from 'enzyme';
import Exam from '../../components/Exam';

test('should render Exam correctly', () => {
  const wrapper = shallow(<Exam />);
  expect(wrapper).toMatchSnapshot();
});