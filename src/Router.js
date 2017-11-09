import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
// Components
import Home from './components/Home';

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home}/>
    </Stack>
  </Router>
);

export default RouterComponent;
