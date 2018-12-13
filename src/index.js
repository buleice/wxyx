
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore'
import 'babel-polyfill';

const store = configureStore()

const renderApp = () =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp)
}

renderApp()
serviceWorker.register();
