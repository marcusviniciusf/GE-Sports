import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// GlobalStyles
import GlobalStyles from '../assets/styles';

const golImg = require('../assets/gol.png');
const substituicaoImg = require('../assets/substituicao.png');

// Parte lateral que informa o minuto atual do jogo assim como seu tempo
const HeaderItem = ({ momento, periodo, children }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleView}>
        <Text style={styles.headerMomentoTxt}>{momento < 10 ? '0' + momento : momento}'</Text>
        <Text style={styles.headerPeriodoTxt}>{periodo.toUpperCase()}</Text>
      </View>
      <View style={GlobalStyles.flex1}>
        {children}
      </View>
    </View>
  )
}

// Faz uma verificação para achar o escudo do time
const imgTime = (time, detalhesJogo) => {
  if(time === detalhesJogo.time_casa.nome) {
    return detalhesJogo.time_casa.escudo;
  } else if (time === detalhesJogo.time_visitante.nome) {
    return detalhesJogo.time_visitante.escudo;
  }
};

const JogoDetalheItem = ({ item, detalhesJogo, tipo }) => {
  // Função para checar se existe o campo no objecto
  const exists = (variable) => {
    if (variable) { return variable; }
    return undefined;
  }
  const { operacao, nome_time, gol, jogo, periodo, momento, substituicao, cartao } = item;
  switch (tipo) {
    case 1:
      return ( 
        <HeaderItem momento={momento} periodo={periodo}>
          <View style={styles.golView}>
            <Image source={{ uri: exists(gol.foto) }} style={[styles.golJogadorImg]}/>
            <Image source={{ uri: imgTime(nome_time, detalhesJogo) }} style={styles.golEscudoImg} />
            <View style={GlobalStyles.justifyCenter}>
              <Text style={styles.golNomeJogador}>{gol.autor}</Text>
              <Text style={styles.golPosicaoJogador}>{gol.posicao_descricao}</Text>
            </View>
          </View>
          <View style={styles.golViewContent}>
            <Text style={styles.golTxt}>
              GOOL DO(A) {nome_time.toUpperCase()}!!
            </Text>
          </View>
        </HeaderItem>
      );
    case 2:
      return (
        <HeaderItem momento={momento} periodo={periodo}>
          <View style={styles.substituicaoView}>
            <View style={GlobalStyles.rowBetween}>
              <View style={GlobalStyles.row}>
                <Image 
                  source={{uri : exists(substituicao.foto)}} 
                  style={[styles.substituicaoImg, styles.substituidoOpacity]}
                />
                <View style={GlobalStyles.justifyCenter}>
                  <Text style={[styles.substituicaoNome, styles.substituidoOpacity]}>{substituicao.nome}</Text>
                  <Text style={[styles.substituicaoPosicao, styles.substituidoOpacity]}>{substituicao.posicao_descricao}</Text>
                </View>
              </View>
              <Text style={[GlobalStyles.colorRed, styles.txtEntraSai]}>SAI</Text>
            </View>
          </View>
          <View style={[styles.substAbsoluteView, GlobalStyles.rowBetweenCenter]}>
            <Image source={{ uri: imgTime(nome_time, detalhesJogo) }} style={styles.substAbsoluteImgTime}/>
            <Image source={substituicaoImg} style={styles.substAbsoluteImgSub}/>
          </View>
          <View style={GlobalStyles.flex1}>
            <View style={GlobalStyles.rowBetween}>
              <View style={GlobalStyles.row}>
                <Image 
                  source={{uri : exists(substituicao.substituido_por.foto)}} 
                  style={styles.substituicaoImg}
                />
                <View style={GlobalStyles.justifyCenter}>
                  <Text style={styles.substituicaoNome}>{substituicao.substituido_por.nome}</Text>
                  <Text style={styles.substituicaoPosicao}>{substituicao.substituido_por.posicao_descricao}</Text>
                </View>
              </View>
              <Text style={[GlobalStyles.colorGreen, styles.txtEntraSai]}>ENTRA</Text>
            </View>
          </View>
        </HeaderItem>
      );
    case 3:
      return (
        <HeaderItem momento={momento} periodo={periodo}>
          <View style={GlobalStyles.rowACenter}>
            <View style={[styles.cartaoViewColor, { backgroundColor: cartao.tipo == 'A' ? '#f5c30b' : '#fb0009' }]}/>
            <View style={GlobalStyles.rowCentered}>
              <Image source={{ uri: exists(cartao.foto) }} style={styles.cartaoImgJogador}/>
              <Image source={{ uri: imgTime(nome_time, detalhesJogo) }} style={styles.cartaoImgTime} />
              <View style={{ marginLeft: 5 }}>
                <Text style={styles.golNomeJogador}>{cartao.nome_jogador}</Text>
                <Text style={{ fontSize: 12, color: '#757575'}}>{cartao.posicao_descricao}</Text>
              </View>
            </View>
          </View>
        </HeaderItem>
      )
    default:
      break;
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10, 
    alignItems: 'center', 
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderStyle: 'solid'
  },
  headerTitleView: { alignItems: 'center', marginRight: 5 },
  headerMomentoTxt: { color: '#999', fontSize: 36, fontWeight: '300' },
  headerPeriodoTxt: { color: '#999', fontSize: 10, alignSelf: 'center' },
  golView: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10, flex: 1 },
  golJogadorImg: { height: 50, width: 50, borderRadius: 20 },
  golEscudoImg: { height: 30, width: 30, borderRadius: 20, marginRight: 10, resizeMode: 'contain' },
  golNomeJogador: { fontSize: 14, fontWeight: 'bold' },
  golPosicaoJogador: { fontSize: 12, fontWeight: '200' },
  golViewContent: { alignItems: 'center', flex: 1 },
  golTxt: { fontSize: 18, fontWeight: 'bold'},
  substituicaoView: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderStyle: 'solid', 
    borderBottomColor: '#999', 
    marginBottom: 5, 
    paddingBottom: 5
  },
  substituidoOpacity: { opacity: 0.5 }, 
  substituicaoImg: { height: 40, width: 40, borderRadius: 20 },
  substituicaoNome: { fontSize: 12, fontWeight: 'bold' },
  substituicaoPosicao: { fontSize: 10, fontWeight: '200' },
  substAbsoluteView: { position: 'absolute', right: 10, top: 30 },
  substAbsoluteImgTime: { height: 30, width: 30, marginRight: 30, resizeMode: 'contain' },
  substAbsoluteImgSub: { height: 20, width: 15, resizeMode: 'contain', backgroundColor: '#f8f8f8' },
  cartaoViewColor: { height: 40, width: 25, borderRadius: 4, marginRight: 5 },
  cartaoImgJogador: { height: 40, width: 40, borderRadius: 20 },
  cartaoImgTime: { height: 30, width: 30, resizeMode: 'contain' },
  cartaoPosicao: { fontSize: 12, color: '#757575' },
  txtEntraSai: { alignSelf: 'center', fontSize: 12 },
})

export default JogoDetalheItem;
