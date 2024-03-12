// src/redux/store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

// Create the Redux store with the combined rootReducer
const store = createStore(rootReducer);

export default store;
