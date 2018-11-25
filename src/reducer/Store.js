import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './RootReducer';

export const history = createHistory();

const initialState = {};
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);