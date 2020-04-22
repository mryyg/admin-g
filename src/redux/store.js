import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

// import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducer';

export default createStore(reducer, applyMiddleware(thunkMiddleware));