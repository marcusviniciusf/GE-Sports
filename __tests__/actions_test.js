import _ from 'lodash';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions';
import * as types from '../src/actions/types';
import moxios from 'moxios';
import { Actions } from 'react-native-router-flux';

import jogosMock from './mocks/jogosMock';
import msgMock from './mocks/msgMock';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('all Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  })

  it('chama FETCH_JOGOS quando completa a requisição', () => {
    const INI = { jogos: [], campeonatos: [] };
    const store = mockStore(INI);
    moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      req.respondWith({
        status: 200,
        response: jogosMock
      });
    });
    const expected = [
      { 
        type: types.FETCH_JOGOS, 
        payload: jogosMock,
        campeonatos: _.map(jogosMock.jogos, jg => jg.nome_campeonato),
        meta: {
          offline: {
            commit: { type: types.FETCH_JOGOS_COMMIT },
            effect: { method: 'GET', url: 'http://globoesporte.globo.com/temporeal/futebol/central.json' }
          }
        }
      }
    ];
    return store.dispatch(actions.fetchJogos()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
  it('chama FETCH_MENSAGENS quando completa a requisição', () => {
    const INI = { mensagens: [] };
    const store = mockStore(INI);
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: msgMock
      });
    });
    const expected = [
      { type: types.FETCH_MENSAGENS, payload: msgMock }
    ];
    return store.dispatch(actions.fetchMensagens()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
