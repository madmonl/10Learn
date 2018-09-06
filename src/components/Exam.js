import React, { Fragment, Component } from 'react';
import MathJax from 'react-mathjax';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { styles } from './Practice'

export default withStyles(styles)(class  extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: props.questions,
      currQuestion: 0
    }
  }

  onQuestionChange = direction => {
    if (direction === 'prev'){
      this.setState(({ currQuestion }) => ({
        currQuestion: currQuestion === 0 
          ? this.state.questions.length - 1
          : currQuestion - 1
      }));
    } else if (direction === 'next') {
      this.setState(({ currQuestion }) => ({
        currQuestion: (currQuestion + 1) % 10
      }));
    } else {
      throw "Button direction is incorrect.";
    }
  }
  
  render () {
    const { questions, currQuestion } = this.state,
          { classes } = this.props;
    return (
      <div className="exam">
        <div className="exam__question">
          <MathJax.Provider>
            <div>
                <MathJax.Node formula={questions[currQuestion].question} />
            </div>
          </MathJax.Provider>
        </div>
        <div className="exam__answers">
          {questions[currQuestion].solutions.map(solution => 
            <MathJax.Provider
              key={solution}
            >
              <div>
                  <MathJax.Node formula={solution} />
              </div>
            </MathJax.Provider>
          )}
        </div>
        <div className="exam__navigation">
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
});
  
