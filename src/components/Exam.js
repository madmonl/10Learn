import React, { Fragment, Component } from 'react';
import MathJax from 'react-mathjax';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { dispatchChangeQuestion } from '../actions/exam';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

export const styles = theme => ({
  navButton: {
    margin: theme.spacing.unit
  },
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

export class Exam extends Component {
  
  constructor(props) {
    super(props);
    this.onQuestionSummaryClick = this.onQuestionSummaryClick.bind(this);
    this.onQuestionChange == this.onQuestionChange.bind(this);
  }

  onQuestionChange = direction => {
    if (direction === 'prev'){
      this.props.dispatchChangeQuestion( this.props.currQuestion === 0 
        ? this.props.questions.length - 1
        : this.props.currQuestion - 1)
    } else if (direction === 'next') {
      this.props.dispatchChangeQuestion((this.props.currQuestion + 1) % 10)
    } else {
      throw "Button direction is incorrect.";
    }
  }
  
  onQuestionSummaryClick = index => {
    this.props.dispatchChangeQuestion(index)    
  }

  onSubmitQuestion = () => 
    this.props.dispatchChangeQuestion((this.props.currQuestion + 1) % 10)
  
  render () {
    const { questions, currQuestion, classes } = this.props;
    return (
      <div className="exam">
        <div className="exam__navigation-container">
          <div className="exam__navigation">
              {questions.map((question, index) =>             
                <Button 
                  key={index}
                  variant="outlined" 
                  className={classes.navButton}
                  onClick={() => this.onQuestionSummaryClick(index)}
                >
                  {index}
                </Button>
              )}
          </div>
        </div>
        <div className="exam__question-navigation-container">
          <div className="exam__question">
            <MathJax.Provider>
              <div>
                  <MathJax.Node formula={questions[currQuestion].question} />
              </div>
            </MathJax.Provider>
          </div>
        </div>
        <div className="exam__answers">
          {questions[currQuestion].solutions.map(solution =>
            <div 
              className="exam__answer-item"
              key={solution}
              onClick={this.onSubmitQuestion}
            >
              <MathJax.Provider>
                <div>
                    <MathJax.Node formula={solution} />
                </div>
              </MathJax.Provider>
            </div>             
          )}
        </div>
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
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeQuestion: (question) => dispatch(dispatchChangeQuestion(question)),
});

const mapStateToProps = (state) => ({
    questions: state.exam.questions,
    currQuestion: state.exam.currQuestion
});
  
export default compose(
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))
  (Exam);

  // questions: props.questions,
  // currQuestion: 0,