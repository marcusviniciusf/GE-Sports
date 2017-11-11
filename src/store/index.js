import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk)
    // autoRehydrate()
  )
);

// persistStore(store, { storage: AsyncStorage, whiteList: ['likedJobs'] });

export default store;