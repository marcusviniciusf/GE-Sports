import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    offline(config)
  )
);

const config = {
  ...offlineConfig
}

// console.log(config);

export default store;