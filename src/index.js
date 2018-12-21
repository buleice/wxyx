import * as Sentry from '@sentry/browser';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore'
import 'babel-polyfill';

Sentry.init({
 dsn: "https://225bf06cf9e3448cb4cbdbf8603a3efd@sentry.io/1354669"
});
// should have been called before using it here
// ideally before even rendering your react app

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
