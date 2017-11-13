import React, { Component } from 'react';
import { View, FlatList, RefreshControl, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TimerMixin from 'react-timer-mixin';
// Components
import JogosListItem from './JogosListItem';
import ModalComponent from  './common/Modal';
// Util
import { filterJogos } from '../util';
// Assets
import GlobalStyles from '../assets/styles';

class Home extends Component {

  componentWillMount() {
    this.props.fetchJogos();
    TimerMixin.setInterval(() => this.props.fetchJogos(), 50000);
  }

  _onRefresh = async () => {
    await this.props.changeRefresh();
    await this.props.fetchJogos();
  }  

  _onRowClick(jogo) {
    // switch (jogo.status) {
    //   case 'Em Andamento':
        return this.props.goDetail(jogo); 
      // case 'Encerrada':
      //   return Alert.alert('Partida já Encerrada!');
      // default:
      //   break;
    // }
  }

  renderRow = ({ item }) => <JogosListItem item={item} onPress={this._onRowClick.bind(this)} />;

  render() {
    const { jogos, refresh, modalOpen, filters } = this.props;
    return (
      <View style={GlobalStyles.flex1}>
        <FlatList 
          style={GlobalStyles.flex1}
          data={jogos}
          renderItem={this.renderRow}
          keyExtractor={i => i.id}
          refreshing={refresh}
          onRefresh={this._onRefresh}
          contentContainerStyle={{ padding: 15 }}
        />
        <ModalComponent 
          openCloseModal={this.props.openModal.bind(this)}
          setFilter={this.props.setFilters.bind(this)} 
          jogos={jogos}
        />
      </View>
    );
  }
}

function mapStateToProps({ jogosReducer }) {
  const { jogos, modalOpen, filters, campeonatos, refresh } = jogosReducer;
  return { 
    refresh,
    campeonatos,
    filters,
    modalOpen,
    jogos: filterJogos(jogos.jogos, filters) 
  };
}

export default connect(mapStateToProps, actions)(Home);
