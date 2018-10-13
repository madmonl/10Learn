import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Toolbar, AppBar, Tabs, Tab, Badge, Paper } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { startLogout, dispatchGuestLogout } from '../actions/auth';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import styled from 'styled-components';
import { PowerSettingsNew, Folder, Edit } from '@material-ui/icons';
import { dispatchHeaderTabsNavigation } from '../actions/material'

// <div className={classes.container}>
const ToolbarCSS = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const TypographyTABS = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-right: 20px;
`;

const TypographyCSS = styled(Typography)`
  font: italic bold Georgia;
`;

const styles = theme => ({
  button: {
    size: 70,
    width: 100,
    fontSize: 15
  }
});

export class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appBarTabsIndex: 0
    }
    this.logout = this.logout.bind(this);
    this.onIndexSelect = this.onIndexSelect.bind(this);
  }
  
  logout = () => {
    if (this.props.guest) {
        this.props.dispatchGuestLogout();
    }
    else {
        this.props.startLogout();
    }
  }

  onIndexSelect = (e, index) => {
    this.props.dispatchHeaderTabsNavigation(this.props.tabs[index]);
  }

  render () {
    const { classes, tabs, currTab } = this.props;
    const currTabIndex = tabs.indexOf(currTab);
    return (
        <div>
            <AppBar position="static" color="default">
              <div className="app-bar-header__theme">            
                <div className="content-container">
                  <ToolbarCSS>
                    <TypographyCSS color="textPrimary" variant="display2">
                        10Learn
                    </TypographyCSS>
                    <div className='app-bar-header'>
                      <Tabs 
                        value={currTabIndex}
                        indicatorColor="secondary"
                        onChange={this.onIndexSelect}
                      >
                        <Tab label={<span className="app-bar-header__tab">
                          <Edit className="app-bar-header__icon" />
                          <TypographyTABS className="app-bar-header__text" color="textPrimary" variant="title">
                            תרגול
                          </TypographyTABS>
                        </span>} />
                        <Tab label={<span className="app-bar-header__tab">
                          <Folder className="app-bar-header__icon" />
                          <TypographyTABS className="app-bar-header__text" color="textPrimary" variant="title">
                            מבחנים קודמים
                          </TypographyTABS>
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

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    dispatchGuestLogout: () => dispatch(dispatchGuestLogout()),
    dispatchHeaderTabsNavigation: (currTab) => dispatch(dispatchHeaderTabsNavigation(currTab))
});

const mapStateToProps = (state) => ({
    guest: state.auth.guest,
    currTab: state.material.currTab,
    tabs: state.material.tabs
});

export default compose(
    withStyles(styles), 
    connect(mapStateToProps, mapDispatchToProps)
  )(ButtonAppBar);