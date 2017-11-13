import _ from 'lodash';
import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform, Switch, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

const ModalComponent = ({ campeonatos, filters, jogos, modalOpen, setFilter, openCloseModal }) => {
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
  return (
    <Modal
      style={styles.modalView}
      onClosed={() => openCloseModal(false)}
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
        <TouchableHighlight onPress={() => openCloseModal(false)} underlayColor={'transparent'}>
          <View style={styles.buttonVoltar}>
            <Text style={styles.buttonVoltarTxt}>VOLTAR</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  );
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
    marginBottom: 15
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
  const { filters, campeonatos, modalOpen } = jogosReducer;
  return { filters, campeonatos, modalOpen };
}

export default connect(mapStateToProps, null)(ModalComponent);
