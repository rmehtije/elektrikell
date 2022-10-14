import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ReactDOM - ote4ajet za svjaz' mezdhu reactom i DOM;
// DOM - (Document object model) - Eta struktura html document v javascirpt objekte.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Sdes' my berjom iz document(DOM) element s id "root" i vstavljajem v etot element react prilozhenie.
root.render(
    <App />
);
// render berjot React elemnty/componenty i obrabatyvajet ih v html(DOM);

// Prostoje objasnenie po4emu react: 
// Izza componentov i sostajanija react izmenjajet tol'ko to chto neobhodimo, sledstvenno rabota sajta bqstraja.