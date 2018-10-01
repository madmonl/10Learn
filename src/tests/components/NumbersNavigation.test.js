import React from 'react';
import { shallow } from 'enzyme';
import { NumbersNavigation } from '../../components/NumbersNavigation';

test('should render NumbersNavigation correctly', () => {
  const wrapper = shallow(<NumbersNavigation />);
  expect(wrapper).toMatchSnapshot();
});

// TODO
// Decide how the component should look like and then 
// write unit tests, since major changes will occur soon.