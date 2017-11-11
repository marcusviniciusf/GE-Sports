import _ from 'lodash';
import axios from 'axios';
import { Actions } from 'react-native-router-flux'; 
import { 
  FETCH_JOGOS, 
  SET_REFRESH,
  FETCH_DETAIL,
  FETCH_MENSAGENS,
  OPEN_CLOSE_MODAL,
  SET_FILTERS
} from './types';

const URL = 'http://globoesporte.globo.com/temporeal/futebol/central.json';

export const fetchJogos = () => async dispatch => {
  const req = await axios.get(URL);
  const jogos = req.data;
  const campeonatos = _.map(jogos.jogos, jg => jg.nome_campeonato );
  dispatch({ type: FETCH_JOGOS, payload: jogos, campeonatos });
}

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

export const openModal = flag => dispatch => {
  dispatch({ type: OPEN_CLOSE_MODAL, payload: flag });
}

export const setFilters = filters => dispatch => {
  dispatch({ type: SET_FILTERS, payload: filters, id: filters.id });
}

export const changeRefresh = () => dispatch => {
  dispatch({ type: SET_REFRESH });
}