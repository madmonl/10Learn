import React, { Fragment, Component } from 'react';
import ExamUpperNavigation from './ExamUpperNavigation';
import ExamBody from './ExamBody';
import ExamLowerNavigation from './ExamLowerNavigation';

export default () => 
  <div className="exam">
    <ExamUpperNavigation />
    <ExamBody />
    <ExamLowerNavigation />        
  </div>

