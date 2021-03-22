import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './Shared/cotainer/StateProvider';
import reducer, { initialState } from './Shared/reducer/Reducer';
import CustomThemeProvider from './Shared/theme/CustomThemePrivider';

const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <StateProvider initialState={initialState} reducer={reducer}>
                <CustomThemeProvider>
                    <App />
                </CustomThemeProvider>
            </StateProvider>
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
