import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import * as actions from '../actions';
import JogoDetalheItem from './JogoDetalheItem';

class JogoDetalhe extends Component {
  componentDidMount() {
    this.props.fetchMensagens(this.props.detalhesJogo.url);
    TimerMixin.setInterval(() => {
      this.props.fetchMensagens(this.props.detalhesJogo.url);
    }, 50000);
  }

  _onRefresh = async () => {
    await this.props.changeRefresh();
    await this.props.fetchMensagens(this.props.detalhesJogo.url);
  };

  renderRow = ({ item }) => {
    const { operacao, tipo } = item;
    if (operacao === 'INCLUSAO') {
      switch (tipo) {
        case 'LANCE_GOL':
          return <JogoDetalheItem item={item} detalhesJogo={this.props.detalhesJogo} tipo={1} />;
        case 'LANCE_SUBSTITUICAO':
          return <JogoDetalheItem item={item} detalhesJogo={this.props.detalhesJogo} tipo={2} />;
        case 'LANCE_CARTAO':
          return <JogoDetalheItem item={item} detalhesJogo={this.props.detalhesJogo} tipo={3} />;
        default:
          break;
      }
    }
  };

  renderHeader(trans, msgs) {
    // console.log(trans);
    if (trans) {
      let gols = null;
      _.forEachRight(msgs, msg => { if (msg.jogo.placar_visitante) { return gols = msg } });
        return (
          <View style={styles.headerContainer}>
            <View style={styles.headerPlacarView}>
              <Image source={{ uri: this.props.detalhesJogo.time_casa.escudo }} style={styles.headerEscudoImg} />
              <Text style={styles.headerGolsTxt}>
              </Text>
              <Text>x</Text>
              <Text style={styles.headerGolsTxt}>
              </Text>
              <Image source={{ uri: this.props.detalhesJogo.time_visitante.escudo }} style={styles.headerEscudoImg} />
            </View>
            <View style={styles.headerLegendaView}>
              <Text style={styles.headerLegendaTxt}>
                {trans.edicao_slug
                  .split('-')
                  .join(' ')
                  .toUpperCase()}
              </Text>
              {trans.rodada_num ? <Text style={styles.headerLegendaTxt}>{trans.rodada_num}ª RODADA</Text> : null}
            </View>
          </View>
        );
    }
  }

  render() {
    const { transmissao } = this.props.detalhe;
    const { mensagens } = this.props;
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={this.renderHeader(transmissao, mensagens)}
          data={mensagens}
          renderItem={this.renderRow}
          contentContainerStyle={styles.flatListContainer}
          refreshing={this.props.refresh}
          onRefresh={this._onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  flatListContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  headerContainer: { marginBottom: 10, flex: 1 },
  headerPlacarView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 5
  },
  headerEscudoImg: { height: 30, width: 30 },
  headerGolsTxt: { fontSize: 18, fontWeight: 'bold' },
  headerLegendaView: { alignItems: 'center', flex: 1 },
  headerLegendaTxt: { fontSize: 12, color: '#757575' }
});

function mapStateToProps(state) {
  const { detalhe, mensagens, refresh } = state.jogosReducer;
  return { detalhe, mensagens, refresh };
}

export default connect(mapStateToProps, actions)(JogoDetalhe);
