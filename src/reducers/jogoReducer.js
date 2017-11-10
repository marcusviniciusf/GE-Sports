import { FETCH_DETAIL, FETCH_MENSAGENS } from '../actions/types';

const INI = {
  detalhe: [],
  mensagens: []
}

export default (state = INI, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      return { ...state, detalhe: action.payload };
    case FETCH_MENSAGENS: 
      return { ...state, mensagens: action.payload };
    default:
      return state;
  }
}