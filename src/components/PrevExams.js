import React, { Fragment, Component } from 'react';
import { Chip, Typography, Paper, Modal, Slide, IconButton } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IDSelector from '../selectors/prevExams'
import compose from 'recompose/compose';
import NumbersNavigation from './NumbersNavigation';
import PrevExamsAnswersStats from './PrevExamsAnswersStats';
import Exam from './Exam';
import PrevExamsFilters from './PrevExamsFilters'
import { dispatchChangeExam, startRemoveExam } from '../actions/exam'
import { Delete } from '@material-ui/icons/';

const styles = theme => ({
  paper: { 
    padding: 0, 
    overflowY: 'auto',
    height: '900px',
    marginTop: '5px'
  },
  chip: {
    margin: theme.spacing.unit
  },
});

function getModalStyle() {
  return {
    margin:'auto'
  };
}

export class PrevExams extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modalExam: {}
    }
  }

  onRemoveExam = (id, e) => {
    e.stopPropagation()
    this.props.startRemoveExam(id)
  }

  changeExamModal = exam => {
    this.setState({ open: true, modalExam: exam });
    // needed because <Exam /> is being rendered and it's values are taken from the store.
    this.props.dispatchChangeExam(exam);
  }
  render () {
    const { classes, prevExams, uid } = this.props,
          { open, modalExam } = this.state
    
    return ( 
      <div className="content-container">
        <Paper className={classes.paper}>
        <PrevExamsFilters />
        {          
          uid 
          ? <div className="prevExams">
              {prevExams.map((exam) => 
                <div
                  className="prevExam"
                  key={exam.id}
                  onClick={() => this.changeExamModal(exam)}
                >
                  <div>
                    {exam.selectedSubjects.map((subject, index) =>
                      <Chip 
                        key={index}
                        label={<span className="chipLabel">{subject}</span>}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </div>
                  <div className="prevExam__item">   
                    <IconButton 
                      className="IconButton"
                      aria-label="ChevronRight"
                      onClick={(e) => this.onRemoveExam(exam.id, e)}
                      color="primary"
                    >
                      <Delete />
                    </IconButton>
                    <NumbersNavigation               
                      questions={exam.questions}
                      currQuestion={0}
                      answeredQuestions={[]}
                      questionsStatus={exam.questionsStatus}
                      preventBorderAppearance={true}  
                    />
                    <PrevExamsAnswersStats exam={exam}/>                    
                  </div>                                              
                </div>            
              )}
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={() => this.setState({ open: false })}
                className="MuiModal-root-container"
              >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                  <div style={getModalStyle()} className="exam__modal-box">
                    <Exam />
                  </div>
                </Slide>
              </Modal>      
            </div>                             
          : <p>התחבר/י בשביל לראות מבחנים קודמים</p>
        }
        </Paper> 
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchChangeExam: (exam) => dispatch(dispatchChangeExam(exam)),
  startRemoveExam: (id) => dispatch(startRemoveExam(id))
});

const mapStateToProps = (state) => ({
  prevExams: IDSelector(state.exam.prevExams, state.filters),
  uid: state.auth.uid
})

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, mapDispatchToProps)
  )(PrevExams);