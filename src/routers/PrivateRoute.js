import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ButtonAppBar from '../components/ButtonAppBar';
import red from '@material-ui/core/colors/red'

const styles = {
    AppBar: {
        background: red 
    }
}

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div> 
          <ButtonAppBar styles={styles.AppBar} />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid || state.auth.guest
});

export default connect(mapStateToProps)(PrivateRoute);
