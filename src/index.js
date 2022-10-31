import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './services/stateService';
import { BrowserRouter } from 'react-router-dom';
// Provider - eto vspomogatel'nqj component dlja raboty s hranilishem redux
const root = ReactDOM.createRoot(document.getElementById('root'));
// BrowserRouter - eto glavnqj komponent react routera kotorqj govorit nashemu prilozheniju 4to sdes' ispol'zujetsa 
// marshutq/Routes. marshrutq idut s adresa/url
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);