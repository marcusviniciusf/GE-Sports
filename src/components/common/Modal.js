import _ from 'lodash';
import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform, Switch, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

// Componente Modal, são 2 modais = configurações e filtro
const ModalComponent = props => {
  const { campeonatos, filters, jogos, modalOpen, setFilter, openCloseModal, modalTipo, setWifi, wifiState } = props;
  const renderPicker = (jogos, filter) => {
    if (jogos) {
      let newOptions = _.orderBy(_.uniq(campeonatos), s => s.charCodeAt() * -1).reverse();
      return (
        <Picker
          itemStyle={{ fontSize: 12 }}
          onValueChange={e => setFilter({ id: 1, pickerValue: e })}
          selectedValue={filters[1].pickerValue}
        >
          <Picker.Item label={'Todos'} value={'all'} />
          {_.map(newOptions, o => <Picker.Item key={o} label={o} value={o} />)}
        </Picker>
      );
    }
  };
  if(modalTipo === 1) {
    return (
      <Modal
        style={styles.modalView}
        onClosed={() => openCloseModal({ flag: false, tipo: 1 })}
        isOpen={modalOpen}
        position={'center'}
        backdropPressToClose
      >
        <View>
          <Text>Filtrar por Campeonato:</Text>
          {renderPicker(jogos, filters)}
          <View style={styles.filterView}>
            <Text>Ordenar por hora de jogo:</Text>
            <Switch value={filters[2].switchValue} onValueChange={e => setFilter({ id: 2, switchValue: e })} />
          </View>
          <TouchableHighlight onPress={() => openCloseModal({ flag: false, tipo: 1 })} underlayColor={'transparent'}>
            <View style={styles.buttonVoltar}>
              <Text style={styles.buttonVoltarTxt}>VOLTAR</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        style={[styles.modalView, { height: 100, padding: 15 }]}
        onClosed={() => openCloseModal({ flag: false, tipo: 2 })}
        isOpen={modalOpen}
        position={'center'}
        backdropPressToClose
      >
        <View>
          <View style={[styles.filterView]}>
            <Text>Somente com Wi-Fi disponivel?</Text>
            <Switch value={wifiState} onValueChange={e => setWifi(e)} />
          </View>
          <TouchableHighlight onPress={() => openCloseModal({ flag: false, tipo: 2 })} underlayColor={'transparent'}>
            <View style={styles.buttonVoltar}>
              <Text style={styles.buttonVoltarTxt}>VOLTAR</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modalView: {
    height: Platform.OS === 'ios' ? 360 : 200,
    width: 300,
    padding: 30,
    borderRadius: 5
  },
  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center'
  },
  pickerView: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  buttonVoltar: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#3B9C00',
    borderRadius: 5
  },
  buttonVoltarTxt: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});

function mapStateToProps({ jogosReducer }) {
  const { filters, campeonatos, modalOpen, modalTipo } = jogosReducer;
  return { filters, campeonatos, modalOpen, modalTipo };
}

export default connect(mapStateToProps, null)(ModalComponent);
