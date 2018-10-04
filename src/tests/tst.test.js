import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const style = {
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

const Composer = ({
  classes,
}) => (
  <p>
    <CircularProgress size={24} className={classes.buttonProgress} />
  </p>);


Composer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Composition = withStyles(style)(Composer);

describe('<Composition />', () => {
  it('should render a styled CircularProgress', () => {
    // const wrapper = shallow(<Composition />);
    // expect(wrapper.find(CircularProgress)).toEqual({});
    
    // Note the use of dive() because Composition is now wrapped by the withStyles higher order component.
  });
})
// describe('<Composition /> 2', () => {
//   it('should render a styled CircularProgress', () => {
//     const wrapper = shallow(<Composition />);
//     expect(wrapper.dive().find(CircularProgress)).toEqual({});
//     // Note the use of dive() because Composition is now wrapped by the withStyles higher order component.
//   });
// });