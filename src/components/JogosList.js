import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableHighlight, Alert, Picker, Switch, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TimerMixin from 'react-timer-mixin';
import Modal from 'react-native-modalbox';
// Components
import JogosListItem from './JogosListItem';
import ModalComponent from  './common/Modal';
// Util
import { filterJogos } from '../util';

class Home extends Component {

  componentWillMount() {
    this.props.fetchJogos();
    // TimerMixin.setInterval(() => this.props.fetchJogos(), 5000);
  }

  _onRefresh = async () => {
    await this.props.changeRefresh();
    await this.props.fetchJogos();
  }  

  _onRowClick(jogo) {
    switch (jogo.status) {
      case 'Em Andamento':
        return this.props.goDetail(jogo); 
      case 'Encerrada':
        return Alert.alert('Partida já Encerrada!');
      default:
        break;
    }
  }

  renderRow = ({ item }) => <JogosListItem item={item} onPress={this._onRowClick.bind(this)} />;

  renderPicker(jogos, filters) {
    if(jogos) {
      let newOptions = _.orderBy(_.uniq(this.props.campeonatos), (s) => s.charCodeAt() * -1).reverse();
      return (
        <Picker
          itemStyle={{ fontSize: 12 }}
          onValueChange={e => this.props.setFilters({ id: 1, pickerValue: e })}
          selectedValue={filters[1].pickerValue}
        >
          <Picker.Item label={'Todos'} value={'all'}/>
          {_.map(newOptions, o => <Picker.Item key={o} label={o} value={o} /> )}
        </Picker>
      );
    }
  }

  render() {
    const { jogos, refresh, modalOpen, filters } = this.props;
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <FlatList 
          style={{ flex: 1 }}
          data={jogos}
          renderItem={this.renderRow}
          keyExtractor={i => i.id}
          refreshing={refresh}
          onRefresh={this._onRefresh}
          contentContainerStyle={{ padding: 15 }}
        />
        {/* <ModalComponent 
          onClose={this.props.openModal.bind(this)}
          setFilter={this.props.setFilters.bind(this)} 
          open={modalOpen}
          jogos={jogos}
          filtros={filters}
        /> */}
        <Modal
          style={
            { 
              height: 360, 
              width: 300,
              padding: 30,
              borderRadius: 5
            }
          }
          onClosed={() => this.props.openModal(false)}
          coverScreen
          isOpen={modalOpen}
          position={'center'}
          backdropPressToClose
        >
          <View>
            <Text>Filtrar por Campeonato:</Text>
            {this.renderPicker(jogos, filters)}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
              <Text>Ordenar por hora de jogo:</Text>
              <Switch 
                value={filters[2].switchValue}
                onValueChange={(e) => this.props.setFilters({ id: 2, switchValue: e })}
              />
            </View>
            <TouchableHighlight 
              onPress={() => this.props.openModal(false)} 
              underlayColor={'transparent'}
            >
              <View style={{ alignItems: 'center', padding: 5, backgroundColor: '#3B9C00', borderRadius: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>VOLTAR</Text>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
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
