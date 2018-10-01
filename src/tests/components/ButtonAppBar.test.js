import React from 'react';
import { shallow } from 'enzyme';
import { ButtonAppBar } from '../../components/ButtonAppBar';
import exams from '../fixtures/exams';
import { Tabs, Button } from '@material-ui/core/';

let wrapper, dispatchHeaderTabsNavigation, startLogout, dispatchGuestLogout, guest, tabs = ['1', '2'];

beforeEach(() => {
  dispatchHeaderTabsNavigation = jest.fn();
  startLogout = jest.fn();
  dispatchGuestLogout = jest.fn();
  wrapper = shallow(
    <ButtonAppBar 
      dispatchHeaderTabsNavigation={dispatchHeaderTabsNavigation} 
      startLogout={startLogout} 
      dispatchGuestLogout={dispatchGuestLogout}
      tabs={tabs}
      classes={{}}
      guest={false}
    />
  );
});

test('should render ButtonAppBar correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find(Tabs).prop('onChange')(undefined, 1);
  expect(dispatchHeaderTabsNavigation).toHaveBeenLastCalledWith(tabs[1]);
});

test('should handle onClick with logged in user', () => {
  wrapper.find(Button).prop('onClick')();
  expect(startLogout).toHaveBeenCalled();
});

test('should handle onClick with logged in guest', () => {
  wrapper = shallow(
    <ButtonAppBar 
      dispatchHeaderTabsNavigation={dispatchHeaderTabsNavigation} 
      startLogout={startLogout} 
      dispatchGuestLogout={dispatchGuestLogout}
      tabs={['1', '2']}
      classes={{}}
      guest={true}
    />);
  wrapper.find(Button).prop('onClick')();
  expect(dispatchGuestLogout).toHaveBeenCalled();
});