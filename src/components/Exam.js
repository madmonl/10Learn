import React, { Fragment, Component } from 'react';
import MathJax from 'react-mathjax';

export default class  extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: props.questions,
      currQuestion: 0
    }
  }
  
  render () {
    const { questions, currQuestion } = this.state;
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
            <p>{solution}</p>
          )}
        </div>
        <div className="exam__navigation"></div>
      </div>
    );
  };
};
  
