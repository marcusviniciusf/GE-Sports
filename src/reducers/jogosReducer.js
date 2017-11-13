import { 
  FETCH_JOGOS,
  FETCH_DETAIL,
  FETCH_MENSAGENS, 
  SET_REFRESH, 
  OPEN_CLOSE_MODAL, 
  SET_FILTERS 
} from '../actions/types';

const INI = {
  detalhe: [],
  mensagens: [],
  jogos: [],
  campeonatos: [],
  refresh: false,
  modalOpen: false,
  filters: {
    '1': { id: 1, pickerValue: 'all' },
    '2': { id: 2, switchValue: false }
  }
}

export default (state = INI, action) => {
  switch (action.type) {
    case SET_REFRESH:
      return { ...state, refresh: true };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, [action.id]: action.payload } };
    case OPEN_CLOSE_MODAL:
      return { ...state, modalOpen: action.payload };
    case FETCH_JOGOS:
      return { ...state, jogos: action.payload, campeonatos: action.campeonatos, refresh: false };
    case FETCH_DETAIL:
      return { ...state, detalhe: action.payload };
    case FETCH_MENSAGENS: 
      return { ...state, mensagens: action.payload.reverse(), refresh: false };
    default:
      return state;
  }
}