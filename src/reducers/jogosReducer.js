import { FETCH_JOGOS, SET_REFRESH } from '../actions/types';

const INI = {
  jogos: [],
  refresh: false
}

export default (state = INI, action) => {
  switch (action.type) {
    // case SET_REFRESH:
    //   return { ...state, refresh: action.payload };
    case FETCH_JOGOS:
      return { ...state, jogos: action.payload };
    default:
      return state;
  }
}