import axios from 'axios';
import { Actions } from 'react-native-router-flux'; 
import { 
  FETCH_JOGOS, 
  SET_REFRESH,
  FETCH_DETAIL,
  FETCH_MENSAGENS 
} from './types';

const URL = 'http://globoesporte.globo.com/temporeal/futebol/central.json';

export const fetchJogos = () => async dispatch => {
  const req = await axios.get(URL);
  dispatch({ type: FETCH_JOGOS, payload: req.data });
}

// export const onRefresh = () => dispatch => {
//   dispatch({ type: SET_REFRESH, payload: true });
// }

export const goDetail = jogo => async dispatch => {
  const req = await axios.get(jogo.url + '/transmissao.json');
  dispatch({ type: FETCH_DETAIL, payload: req.data });
  const { time_casa, time_visitante } = jogo;
  Actions.jogoDetalhe({ detalhesJogo: jogo, title: time_casa.nome + ' x ' + time_visitante.nome });
}

export const fetchMensagens = url => async dispatch => {
  const req = await axios.get(url + '/mensagens.json');
  dispatch({ type: FETCH_MENSAGENS, payload: req.data });
}