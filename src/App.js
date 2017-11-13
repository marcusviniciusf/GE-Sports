import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// Router
import Router from './Router';
// Store
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
