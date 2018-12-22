import React, { Fragment } from 'react';
import PrevExams from './PrevExams';
import Practice from './Practice';
import Shop from './Shop';
import { connect } from 'react-redux';
// import 'C:\\IDF\\personal\\React Course\\react-course-projects\\10Learn\\public\\scripts\\cors';

export const DashboardPage = ({ currTab }) => (
  <div>
    {currTab === 'תרגול' && <Practice />}
    {currTab === 'מבחנים קודמים' && <PrevExams />}
    {currTab === 'חנות' && <Shop/>}
  </div>
);


const mapStateToProps = (state) => ({
    currTab: state.material.currTab
});

export default connect(mapStateToProps)(DashboardPage);
  
