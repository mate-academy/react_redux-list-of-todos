import { createStore } from 'redux';
import {ActionType, AppActions, DecrementInterface, IncrementInterface, SetValueInterface} from "../actions/actions";

const initialState: InitialState = {
    currentValue: 0,
};


//Action
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SET_VALUE = 'SET_VALUE';

// Action Creator
export const IncrementCreator = (): IncrementInterface => ({
    type: INCREMENT,
});

export const DecrementCreator = (): DecrementInterface => ({
    type: DECREMENT,
});

export const setValue = (value: number): SetValueInterface => ({
    type: SET_VALUE,
    value,
});


const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                currentValue: state.currentValue - 1,
            };

        case 'DECREMENT':
            return {
                ...state,
                currentValue: state.currentValue + 1,
            };

        case 'SET_VALUE':
            return {
                ...state,
                currentValue: action.value,
            };

        default:
            return state
    }
};

const store = createStore(reducer, initialState);

export default store;
