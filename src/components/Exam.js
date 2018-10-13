import React, { Fragment, Component } from 'react';
import ExamUpperNavigation from './ExamUpperNavigation';
import ExamBody from './ExamBody';
import ExamLowerNavigation from './ExamLowerNavigation';

export default ({ displaySubmitExamButton }) => 
  <div dir="rtl" className="exam">
    <ExamUpperNavigation displaySubmitExamButton={displaySubmitExamButton}/>
    <ExamBody />
    <ExamLowerNavigation />        
  </div>