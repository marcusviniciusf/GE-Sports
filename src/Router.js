import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Image } from 'react-native';
// Common
import LeftRightButtons from './components/LeftRightButtons';
// Components
import JogosList from './components/JogosList';
import JogoDetalhe from './components/JogoDetalhe';

const logo = require('./assets/globoesporte.png');

const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Scene 
        key="jogosList" 
        initial
        renderLeftButton={<LeftRightButtons button={'left'} />}
        renderRightButton={<LeftRightButtons button={'right'} />}
        navigationBarTitleImage={logo} 
        component={JogosList} 
        navigationBarTitleImageStyle={{ resizeMode: 'contain', height: 40, flex: 1 }}
      />
      <Scene 
        key='jogoDetalhe'
        title=''
        component={JogoDetalhe}
      />
    </Stack>
  </Router>
);

export default RouterComponent;
