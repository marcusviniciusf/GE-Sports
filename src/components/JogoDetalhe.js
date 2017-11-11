import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import * as actions from '../actions';

class JogoDetalhe extends Component {
  componentDidMount() {
    this.props.fetchMensagens(this.props.detalhesJogo.url);
    TimerMixin.setInterval(() => {
      this.props.fetchMensagens(this.props.detalhesJogo.url);
    }, 100000);
  }

  renderRow = (item) => {
    // console.log(item);
    return(
      <View style={{
        flexDirection: 'row', padding: 15
      }}>
        <View>
          <Text>Teste</Text>
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    console.log(this.props);
    const { detalhe, mensagens } = this.props;
    return (
      <FlatList 
        style={{ flex: 1 }}
        keyExtractor={this._keyExtractor}
        // ListHeaderComponent={this.renderHeader(jogos)}
        data={mensagens}
        renderItem={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { detalhe, mensagens } = state.jogoReducer;
  return { detalhe, mensagens };
}

export default connect(mapStateToProps, actions)(JogoDetalhe);