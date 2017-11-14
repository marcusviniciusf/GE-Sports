import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

// Titulo da barra de navegação
const Title = () => {
  const { imgStyle, container } = styles;
  return (
    <View style={container}>
      <Image source={require('../../assets/globoesporte.png')} style={imgStyle}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imgStyle: {
    height: 50,
    width: 60,
    resizeMode: 'contain'
  }
})

export default Title;