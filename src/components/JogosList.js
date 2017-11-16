import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, AsyncStorage, NetInfo, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TimerMixin from 'react-timer-mixin';
// Components
import JogosListItem from './JogosListItem';
import ModalComponent from './common/Modal';
// Util
import { filterJogos } from '../util';
// Assets
import GlobalStyles from '../assets/styles';

class Home extends Component {
  constructor() {
    super();
    this.state = { wifiOnly: false, netStateWifi: null };
  }

  componentWillMount() {
    TimerMixin.setInterval(() => this.props.fetchJogos(), 50000);
    this.getStorageValue();
  }

  componentDidMount() {
    this.props.fetchJogos();
    NetInfo.addEventListener('connectionChange', connInf => this.setState({ netStateWifi: connInf.type }));
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange');
  }

  // Função asyncrona para buscar no Storage o item referente
  async getStorageValue() {
    const value = await AsyncStorage.getItem('@myWifiConfig');
    const bool = value === 'with' ? true : false;
    this.setState({ wifiOnly: bool });
    return value;
  }

  // Função para armazenar no AsyncStorage a config para wifi on/off
  setWifiOnly = bool => {
    const newStr = bool ? 'with' : 'without';
    this.setState({ wifiOnly: bool }, () => {
      try {
        AsyncStorage.setItem('@myWifiConfig', newStr);
      } catch (error) {
        console.log('AsyncStoage:' + error.message);
      }
    });
  };

  _onRefresh = async () => {
    await this.props.changeRefresh();
    await this.props.fetchJogos();
  };

  _onRowClick(jogo) {
    switch (jogo.status) {
      case 'Em Andamento':
        return this.props.goDetail(jogo);
      case 'Encerrada':
        return Alert.alert('Partida já Encerrada!', 'Deseja ver os lances?', [
          { text: 'Ver', onPress: () => this.props.goDetail(jogo) },
          { text: 'Voltar' }
        ]);
      default:
        return Alert.alert('Partida ainda não começou.');
    }
  }

  renderRow = ({ item }) => <JogosListItem item={item} onPress={this._onRowClick.bind(this)} />;

  render() {
    const { jogos, refresh, modalOpen, filters, networkStatus } = this.props;
    const { wifiOnly, netStateWifi } = this.state;
    return (
      <View style={GlobalStyles.flex1}>
        {wifiOnly && netStateWifi !== 'wifi' ? (
          <View style={[styles.alerView, { backgroundColor: '#3b9c00' }]}>
            <Text style={styles.alertTxt}>SEU WIFI ESTÁ DESLIGADO, RECOMENDAMOS QUE LIGUE</Text>
          </View>
        ) : (
          <View />
        )}
        {!networkStatus ? (
          <View style={[styles.alerView, { backgroundColor: '#f00' }]}>
            <Text style={styles.alertTxt}>NÃO DETECTAMOS NENHUMA CONEXÃO DE DADOS</Text>
          </View>
        ) : (
          <View />
        )}
        <FlatList
          style={GlobalStyles.flex1}
          data={jogos}
          renderItem={this.renderRow}
          keyExtractor={i => i.id}
          refreshing={refresh}
          onRefresh={networkStatus ? this._onRefresh : false}
          contentContainerStyle={{ padding: 15 }}
        />
        <ModalComponent
          openCloseModal={this.props.openModal.bind(this)}
          setFilter={this.props.setFilters.bind(this)}
          jogos={this.props.jogos}
          setWifi={this.setWifiOnly.bind(this)}
          wifiState={this.state.wifiOnly}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alerView: { alignItems: 'center', padding: 10 },
  alertTxt: { fontSize: 12, color: '#fff' }
})

function mapStateToProps({ jogosReducer }) {
  console.log(jogosReducer);
  const { networkStatus, jogos, modalOpen, filters, campeonatos, refresh } = jogosReducer;
  return {
    networkStatus,
    refresh,
    campeonatos,
    filters,
    modalOpen,
    jogos: filterJogos(jogos.jogos, filters)
  };
}

export default connect(mapStateToProps, actions)(Home);
