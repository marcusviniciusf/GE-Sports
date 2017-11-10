import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TimerMixin from 'react-timer-mixin';
// Components
import JogosListItem from './JogosListItem';

class Home extends Component {

  componentWillMount() {
    this.props.fetchJogos();
    TimerMixin.setInterval(() => this.props.fetchJogos(), 10000);
  }

  _onRefresh = () => {
    this.props.onRefresh();
    this.props.fetchJogos();
  }  

  _onRowClick(jogo) {
    if (jogo.status == 'Em Andamento') {
      return this.props.goDetail(jogo);
      return;
    } 
    return Alert.alert(jogo.status);
  }

  renderRow = ({ item }) => {
    return <JogosListItem item={item} onPress={this._onRowClick.bind(this)} />;
  }

  render() {
    const { jogos, refresh } = this.props;
    console.log(refresh);
    return(
      <FlatList 
        style={{ flex: 1 }}
        data={jogos.jogos}
        renderItem={this.renderRow}
        keyExtractor={i => i.id}
        // refreshing={this.props.refresh}
        // onRefresh={() => this._onRefresh}
        contentContainerStyle={{ padding: 15 }}
      />
    );
  }
}

function filtroJogos(jogos) {
  return jogos;
};

function mapStateToProps(state) {
  console.log('mapStateTopProps', state);
  const { jogos } = state.jogosReducer;
  return { 
    jogos: filtroJogos(jogos) 
  };
}

export default connect(mapStateToProps, actions)(Home);
