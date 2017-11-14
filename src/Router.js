import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Image } from 'react-native';
// Common
import Title from './components/common/Title';
import LeftRightButtons from './components/common/LeftRightButtons';
// Components
import JogosList from './components/JogosList';
import JogoDetalhe from './components/JogoDetalhe';

const RouterComponent = () => (
  <Router tintColor={'#47a721'}>
    <Stack key="root">
      <Scene 
        key="jogosList" 
        initial
        renderLeftButton={<LeftRightButtons button={'left'} />}
        renderRightButton={<LeftRightButtons button={'right'} />}
        renderTitle={<Title />}
        component={JogosList} 
      />
      <Scene
        key='jogoDetalhe'
        title='Jogo'
        component={JogoDetalhe}
      />
    </Stack>
  </Router>
);

export default RouterComponent;
