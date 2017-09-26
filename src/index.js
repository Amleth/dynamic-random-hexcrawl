import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import loggerMW from 'redux-logger';
import Map from './containers/Map';
import Parameters from './containers/Parameters';
import './data/oltree';
import {initHexes} from './hex/hex-utils';
import reducers from './reducers';
import './styles.css';

const DEFAULT_MAP_RADIUS = 6;
let hexes = initHexes(DEFAULT_MAP_RADIUS);
const initialState = {
  mapRadius: DEFAULT_MAP_RADIUS,
  hexes: hexes
};

const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(routerMiddleware(history), loggerMW)(createStore);
const store = createStoreWithMiddleware(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Map}/>
        <Route path='/m' component={Map}/>
        <Route path='/p' component={Parameters}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#approot')
);