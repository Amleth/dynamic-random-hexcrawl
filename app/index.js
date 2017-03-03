import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import {createStore} from 'redux';
import App from './containers/App';
import Map from './containers/Map';
import Parameters from './containers/Parameters';
import reducers from './reducers';
import {initHexes} from './hex/hex-utils';
import './data/oltree';

const DEFAULT_MAP_RADIUS = 6;

const store = createStore(reducers, {
  mapRadius: DEFAULT_MAP_RADIUS,
  hexes: initHexes(DEFAULT_MAP_RADIUS)
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Map}/>
        <Route path="m" component={Map}/>
        <Route path="p" component={Parameters}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// sinon, ça c'est cool aussi : https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm