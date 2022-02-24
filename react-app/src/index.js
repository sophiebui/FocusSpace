import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';

const store = configureStore();

// optional config for react-alert
const options = {
    // you can also just use 'bottom center'
    position: 'top right',
    timeout: 4000,
    offset: '50px',
    // you can also just use 'scale'
    transition: transitions.SCALE
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
