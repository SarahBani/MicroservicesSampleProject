import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
//import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { browserHistory } from './browserHistory';
import { store } from './store';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);

registerServiceWorker();
