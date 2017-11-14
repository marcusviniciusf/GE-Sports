import React from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux'
import * as actions from '../../actions';

const leftButton = require('../../assets/filter.png');
const rightButton = require('../../assets/config.png'); 

const Button = ({ onPress, btn }) => 
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <Image source={btn} style={styles.images}/>
  </TouchableHighlight>;

// Componente que renderiza os botões do navigationBar
const LeftRightButtons = ({ button, openModal }) =>  {
  const renderButtons = button => {
    if (button === 'left') {
      return (
        <Button btn={leftButton} onPress={() => openModal({ flag: true, tipo: 1 })}/>
      );
    } 
    return (
      <Button btn={rightButton} onPress={() => openModal({ flag: true, tipo: 2 })}/>
    );
  } 
  return (
    <View>
      {renderButtons(button)}
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    height: 20,
    width: 50,
    resizeMode: 'contain'
  }
});

export default connect(null, actions)(LeftRightButtons);