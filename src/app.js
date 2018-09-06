import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout, dispatchGuestLogout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: grey[400],
      light: grey[200],
      dark: grey[700]
    },
    type: 'dark'
  },
  spacing: {
    unit: 10
  }
});

const store = configureStore();
const jsx = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </MuiThemeProvider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <LoadingPage />
  </MuiThemeProvider>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

const unsubscribe = store.subscribe(() => {
    if (store.getState().auth.guest) {
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    }
});
