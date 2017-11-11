import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

class JogoDetalheItem extends Component {
  render() {
    return(
      <View>
        <Text>
          Item
        </Text>
      </View>
    );
  }
}

export default connect()(JogoDetalheItem);
