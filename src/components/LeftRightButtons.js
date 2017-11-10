import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, TouchableHighlight, Image, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modalbox';

const leftButton = require('../assets/filter.png');
const rightButton = require('../assets/config.png'); 

const Button = ({onPress, btn}) => 
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <Image source={btn} style={styles.images}/>
  </TouchableHighlight>;

class LeftRightButtons extends Component {
  state = { modalVisible: false };

  renderButtons(button) {
    if (button === 'left') {
      return (
        <Button btn={leftButton} onPress={this._showModal}/>
      );
    } 
    return (
      <Button btn={rightButton} onPress={this._showModal}/>
    );
  }  

  _showModal = () => this.setState({ modalVisible: true })
  
  _hideModal = () => this.setState({ modalVisible: false })
  
  render() {
    const { button } = this.props;
    return (
      <View>
        {this.renderButtons(button)}
        <Modal
          style={
            { 
              height: 300, 
              width: 300,
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
          isOpen={this.state.modalVisible}
          position={'bottom'}
          backdropPressToClose
        >
          <View>
            <Text>
              Teste
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  images: {
    height: 20,
    width: 50,
    resizeMode: 'contain'
  }
})

export default connect()(LeftRightButtons);