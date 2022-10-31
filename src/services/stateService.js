// Redux eto otdel'nqj modul dlja upravlenija sostojanijem prilozhenij
// V kracii eto globalnqj state prilozhenija
// Redux toolkit - vspomogatel'nyj modul dlja raboty s redux
// Blogodorja Redux my mozhem lu4she kontrolirovat' render componentov
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Kak i u useState u redux jest initial state ili pervonachal'nqje znachenija - eto obq4nqj object
const initialState = {
    hourValue: 1,
    currentPrice: 0,
    selectedCountry: {
        key: 'ee', title: 'Eesti',
    },
    bestTimeRange: {
        from: 0,
        until: 0,
        timestamp: null,
        bestPrice: 0,
    },
    worstTimeRange: {
        from: 0,
        until: 0,
        worstPrice: 0,
    }
};

// createAction - objevlenija sobytija kotoroe my budem ispol'zovat' dlja smeny redux sostojanija/state
// pohozhe na setState reacta
export const setHourValue = createAction("setHourValue");
export const setCurrentPrice = createAction("setCurrentPrice");
export const setSelectedCountry = createAction("setSelectedCountry");
export const setBestTimeRange = createAction("setBestTimeRange");
export const setWorstTimeRange = createAction("setWorstTimeRange");


// Rekutor (reducer) - eta funkcija kotoraja ispol'zujetsa dlja izmenenija/vycheslenija
// sostojanija na osnove previdushega intialState i primenjajemogo dejstvija Action
const reducer = createReducer(initialState, {
    [setHourValue]: (state, action) => {
        state.hourValue = action.payload;
    },
    [setCurrentPrice]: (state, action) => {
        state.currentPrice = action.payload;
    },
    [setSelectedCountry]: (state, action) => {
        state.selectedCountry = action.payload;
    },
    [setBestTimeRange]: (state, action) => {
        state.bestTimeRange = action.payload;
    },
    [setWorstTimeRange]: (state, action) => {
        state.worstTimeRange = action.payload;
    },
});
// Store - storage - hranilishe v kotorom harinitsa vsja nasha informacija ob global'nom sostojanii
export const store = configureStore({ reducer });