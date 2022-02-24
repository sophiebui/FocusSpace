import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { transitions, types, zIndex, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';

const store = configureStore();


// config for react-alert
const options = {
    position: 'top right',
    timeout: 2000,
    offset: '80px',
    type: types.SUCCESS,
    transition: transitions.FADE,
    containerStyle: {zIndex: 99999}
  }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <ModalProvider>
                <App />
            </ModalProvider>
        </AlertProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
