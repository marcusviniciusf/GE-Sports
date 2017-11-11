import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';

const JogosListItem = ({ item, onPress }) => {
  const { status, time_casa, time_visitante, hora, localizacao, fase_rodada, nome_campeonato, url } = item;
  const renderStatus = (status) => {
    switch (status) {
      case 'Em Andamento':
        return <Text style={styles.statusText}>ACOMPANHE AO VIVO</Text>;
      case 'Encerrada':
        return <Text style={[styles.statusText, { color: '#c62828' }]}>ENCERRADO</Text>;
      default:
        return null
    };
  };
  return (
    <TouchableHighlight 
      style={styles.buttonContainer}
      onPress={() => onPress(item)} 
      underlayColor={'#e3e3e3'}
    >
      <View style={styles.container}>
        <Text style={styles.nomeCampeonato}>{nome_campeonato}</Text>
        <View style={styles.placarView}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: time_casa.escudo }} style={styles.placarImg} />
            <Text style={styles.placarSiglaTxt}>{time_casa.sigla}</Text>
          </View>
          <View style={styles.placarResultadoView}>
            <Text style={styles.placarResultadoTxt}>{time_casa.placar}</Text>
            <Text style={{ fontWeight: 'bold' }}>X</Text>
            <Text style={styles.placarResultadoTxt}>{time_visitante.placar}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: time_visitante.escudo }} style={styles.placarImg} />
            <Text style={styles.placarSiglaTxt}>{time_visitante.sigla}</Text>
          </View>
          {renderStatus(status)}
        </View>
        <View style={styles.legendaView}>
          <Text style={styles.legendaTxt}>{localizacao.toUpperCase()}</Text>
          <Text style={styles.legendaTxt}>{hora}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 5,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f8f8f8'
  },
  container: { paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 },
  nomeCampeonato: { alignSelf: 'center', fontSize: 10, color: '#757575', marginBottom: 5 },
  placarView: { 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    position: 'relative' 
  },
  placarImg: { height: 30, width: 30 },
  placarSiglaTxt: { fontWeight: '400', marginTop: 5 },
  placarResultadoView: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    flex: 1 
  },
  placarResultadoTxt: { fontSize: 25, fontWeight: 'bold' },
  statusText: { 
    position: 'absolute', 
    fontSize: 10, 
    color: '#3b9c00', 
    left: 0, 
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent', 
    textAlign: 'center',
  },
  legendaView: { alignItems: 'center', marginTop: 10 },
  legendaTxt: { fontSize: 10, color: '#757575' }
})

export default JogosListItem;
