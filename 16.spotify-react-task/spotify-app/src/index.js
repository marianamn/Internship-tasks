import React from 'react';
import App from './containers/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
    <Provider store={store} history={history}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root'));

