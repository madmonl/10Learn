import React, { Fragment } from 'react';
import LoadingPage from './LoadingPage';
import { Paper } from '@material-ui/core';
import PrevExams from './PrevExams';
import Practice from './Practice';
import { connect } from 'react-redux';

const DashboardPage = ({ currTab }) => (
  <Fragment>
    {currTab === 'תרגול' && <Practice/>}
    {currTab === 'מבחנים קודמים' && <PrevExams/>}
  </Fragment>
);


const mapStateToProps = (state) => ({
    currTab: state.material.currTab
});

export default connect(mapStateToProps)(DashboardPage);
  
