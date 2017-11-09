import axios from 'axios';
import { FETCH_JOGOS } from './types';

const URL = 'http://globoesporte.globo.com/temporeal/futebol/central.json';

export const fetchJogos = () => async dispatch => {
  const req = await axios.get(URL);
  dispatch({ type: FETCH_JOGOS, payload: req.data });
}
