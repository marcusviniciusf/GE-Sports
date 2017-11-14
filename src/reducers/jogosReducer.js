import { 
  SET_FILTERS,
  SET_REFRESH, 
  OPEN_CLOSE_MODAL, 
  FETCH_MENSAGENS, 
  FETCH_DETAIL,
  FETCH_JOGOS,
  FETCH_JOGOS_COMMIT,
  FETCH_JOGOS_ROLLBACK
} from '../actions/types';

const INI = {
  detalhe: [],
  mensagens: [],
  jogos: [],
  campeonatos: [],
  refresh: false,
  modalOpen: false,
  modalTipo: 1,
  filters: {
    '1': { id: 1, pickerValue: 'all' },
    '2': { id: 2, switchValue: false }
  },
  networkStatus: null
}

export default (state = INI, action) => {
  console.log(action);
  switch (action.type) {
    case SET_REFRESH:
      return { ...state, refresh: true };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, [action.id]: action.payload } };
    case OPEN_CLOSE_MODAL:
      return { ...state, modalOpen: action.payload.flag, modalTipo: action.payload.tipo };
    case 'Offline/STATUS_CHANGED':
      return { ...state, networkStatus: action.payload.online };
    case FETCH_JOGOS:
      return { ...state, jogos: action.payload, campeonatos: action.campeonatos, refresh: false };
    case FETCH_JOGOS_COMMIT:
      return { ...state, jogos: action.payload, campeonatos: action.campeonatos, refresh: false };
    case FETCH_JOGOS_ROLLBACK:
      return { ...state, jogos: action.payload, campeonatos: action.campeonatos, refresh: false };
    case FETCH_DETAIL:
      return { ...state, detalhe: action.payload };
    case FETCH_MENSAGENS: 
      return { ...state, mensagens: action.payload.reverse(), refresh: false };
    default:
      return state;
  }
}