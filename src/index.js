import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './i18next/i18next';

const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Suspense fallback='loading'>
                <App />
            </Suspense>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

render();
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}
reportWebVitals();
