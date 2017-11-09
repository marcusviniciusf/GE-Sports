import { FETCH_JOGOS } from '../actions/types';

const INI = {
  jogos: [],
}

export default (state = INI, action) => {
  switch (action.type) {
    case FETCH_JOGOS:
      return { ...state, jogos: action.payload };
    default:
      return state;
  }
}