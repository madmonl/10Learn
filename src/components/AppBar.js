import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Toolbar, AppBar, Tabs, Tab, Badge } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import styled from 'styled-components';
import { PowerSettingsNew, Folder, Edit } from '@material-ui/icons';

// <div className={classes.container}>
const ToolbarCSS = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const styles = {
  button: {
    size: 70,
    width: 100,
    fontSize: 15
  }
};

export class ButtonAppBar extends Component {
  constructor(props) {
     super(props);
  }
  logout = () => {
    if (this.props.guest) {
        this.props.dispatchGuestLogout();
    }
    else {
        this.props.startLogout();
    }
}

  render () {
    const { classes } = this.props;
    return (
        <div>
            <AppBar position="static" color="default">
              <div className="app-bar-header__theme">            
                <div className="content-container">
                  <ToolbarCSS>
                    <Typography color="textPrimary" variant="display2">
                        10Learn
                    </Typography>
                    <div className='app-bar-header'>
                      <Tabs value={0}>              
                        <Tab label={<span className="app-bar-header__tab">
                          <Edit />
                          תרגול
                        </span>} />
                        <Tab label={<span className="app-bar-header__tab">
                          <Folder />
                          מבחנים קודמים
                        </span>} />
                      </Tabs>
                      <Button className={classes.button} size='medium' onClick={this.logout}>
                        <PowerSettingsNew />
                        התנתק
                      </Button>
                    </div>          
                  </ToolbarCSS>
                </div>                
              </div>
            </AppBar>
        </div>
    );
  };
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    dispatchGuestLogout: () => dispatch(dispatchGuestLogout())
});

const mapStateToProps = (state) => ({
    guest: state.auth.guest
});

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, mapDispatchToProps)
  )(ButtonAppBar);