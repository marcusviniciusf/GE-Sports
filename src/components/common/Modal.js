import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

const ModalComponent = props => {
  const renderPicker = (jogos, filter) => {
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
  };
  return (
    <Modal></Modal>
  );
}

const styles = StyleSheet.create({
  modalView: { 
    height: 360, 
    width: 300,
    padding: 30,
    borderRadius: 5
  },
  filterView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15
  },

})

export default ModalComponent;