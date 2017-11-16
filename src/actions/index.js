import _ from 'lodash';
import axios from 'axios';
import { Actions } from 'react-native-router-flux'; 
import { 
  SET_REFRESH,
  SET_FILTERS,
  OPEN_CLOSE_MODAL,
  FETCH_DETAIL,
  FETCH_MENSAGENS,
  FETCH_JOGOS,
  FETCH_JOGOS_ROLLBACK,
  FETCH_JOGOS_COMMIT
} from './types';

const URL = 'http://globoesporte.globo.com/temporeal/futebol/central.json';

export const fetchJogos = () => async dispatch => {
  const req = await axios.get(URL);
  const jogos = req.data;
  const campeonatos = _.map(jogos.jogos, jg => jg.nome_campeonato );
  dispatch({ 
    type: FETCH_JOGOS, 
    payload: jogos, campeonatos,
    meta: {
      offline: {
        effect: { url: URL, method: 'GET' },
        commit: { type: FETCH_JOGOS_COMMIT },
        // rollback: { type: FETCH_JOGOS_ROLLBACK },
      }
    }
  });
}

export const fetchMensagens = url => async dispatch => {
  const req = await axios.get(url + '/mensagens.json');
  dispatch({ type: FETCH_MENSAGENS, payload: req.data });
}

export const goDetail = jogo => async dispatch => {
  const req = await axios.get(jogo.url + '/transmissao.json');
  dispatch({ type: FETCH_DETAIL, payload: req.data });
  const { time_casa, time_visitante } = jogo;
  Actions.jogoDetalhe({ detalhesJogo: jogo, title: time_casa.nome + ' x ' + time_visitante.nome });
}

export const openModal = option => dispatch => {
  dispatch({ type: OPEN_CLOSE_MODAL, payload: option });
}

export const setFilters = filters => dispatch => {
  dispatch({ type: SET_FILTERS, payload: filters, id: filters.id });
}

export const changeRefresh = () => dispatch => {
  dispatch({ type: SET_REFRESH });
}