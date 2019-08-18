import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//constants

const GET_ISLOADING = 'GET_ISLOADING';
const SET_TODOS = 'SET_TODOS';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_VALUE = 'SORT_BY_VALUE';
const DELETE_TODO = 'DELETE_TODO';

const initialState = {
  unitedData: [],
  isLoaded: false,
  isLoading: false,
};

// action creators

export const getLoading = () => ({ type: GET_ISLOADING });
export const setTodos = (value) => ({ type: SET_TODOS, value })
export const sortByName = () => ({ type: SORT_BY_NAME })
export const sortByValue = (value) => ({ type: SORT_BY_VALUE, value })
export const deleteTodo =(value) => ({ type: DELETE_TODO, value })

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISLOADING':
      return {
         ...state,
        isLoading: true,
      };
    case 'SET_TODOS':
      return {
        ...state,
        unitedData: action.value,
        isLoading: false,
        isLoaded: true,
      }
    case 'SORT_BY_NAME':
      return {
        ...state,
        unitedData: [...state.unitedData].sort((a, b) =>
          String(a.user.name).localeCompare(String(b.user.name))),
      }
    case 'SORT_BY_VALUE':
      return {
        ...state,
        unitedData: [...state.unitedData].sort((a, b) =>
          String(a[action.value]).localeCompare(String(b[action.value]))),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        unitedData: [...state.unitedData].filter(todo => todo.id !== action.value)
      }
    default:
      return state;
  }
};

// selectors

export const getUnitedData = state => state.unitedData;
export const getIsLoaded = state => state.isLoaded;
export const getIsLoading = state => state.isLoading;


// store

const store = createStore(reducer, initialState, composeWithDevTools());

export default store;
