
import React, { Fragment, Component } from 'react';
import { dispatchChangeQuestion } from '../actions/exam';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

export const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  }
})

export class ExamLowerNavigation extends Component {
  constructor (props) {
    super(props);
    this.onQuestionChange = this.onQuestionChange.bind(this);
  }
  
  onQuestionChange = direction => {
    if (direction === 'prev'){
      this.props.dispatchChangeQuestion( this.props.currQuestion === 0 
        ? this.props.questions.length - 1
        : this.props.currQuestion - 1)
    } else if (direction === 'next') {
      this.props.dispatchChangeQuestion((this.props.currQuestion + 1) % this.props.questions.length)
    } else {
      throw "Button direction is incorrect.";
    }
  }

  render () {
    const { questions, currQuestion, classes } = this.props;
    
    return (
      <div>
        <div className="exam__navigation-container">
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => this.onQuestionChange('prev')}
          >
            <Send className={classes.rightIcon} />
            שאלה קודמת            
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => this.onQuestionChange('next')}
          >
            שאלה הבאה
            <Send className={classes.leftIcon} />
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question))
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    currQuestion: state.exam.currQuestion
});
  
export default compose(
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))
  (ExamLowerNavigation);

    