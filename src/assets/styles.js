import React from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  justifyCenter: {
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  rowBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rowACenter: {
    flexDirection: 'row', 
    alignItems: 'center'
  },  
  rowCentered: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  rowBetweenCenter: {
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  },
  colorGreen: {
    color: '#47a721'
  },
  colorRed: {
    color: '#f00'
  }
});
