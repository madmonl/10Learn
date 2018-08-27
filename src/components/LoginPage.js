import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startFacebookLogin, dispatchGuestLogin } from '../actions/auth';
import { Link } from 'react-router-dom';

export const LoginPage = ({ startGoogleLogin, startFacebookLogin, dispatchGuestLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Boilerplate</h1>
      <p>Tag line for app.</p>
      <button className="button" onClick={startGoogleLogin}>היכנסו עם גוגל</button>
      <button className="button" onClick={startFacebookLogin}>היכנסו עם פייסבוק</button>      
      <Link to="/dashboard" onClick={dispatchGuestLogin}>הירשמ/י כאורח/ת</Link>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startFacebookLogin: () => dispatch(startFacebookLogin()),
  dispatchGuestLogin: () => dispatch(dispatchGuestLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
