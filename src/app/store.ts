import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { filterSlice } from '../features/filter';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>; /*store.getState = { todos: {items: Todo[], selectedTodo: Todo|null, loading: boolean}, filter: {query: string, status: Status} } */
export type AppDispatch = typeof store.dispatch;

/* ReturnType - ts - перевіряє те що повертає функція а не саме значення */

/*const todosSlice = { // ця фігня яку ми за крейтСлайсили
  name: 'todos',
  reducer: function (state = { items: [], selectedTodo: null, loading: false }, action) {
    switch (action.type) {
      case 'todos/setTodos':
        return { ...state, items: action.payload };
      case 'todos/setSelectedTodo':
        return { ...state, selectedTodo: action.payload };
      case 'todos/setLoading':
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  },
  actions: {
    setTodos: function (payload) {
      return { type: 'todos/setTodos', payload: payload };
    },
    setSelectedTodo: function (payload) {
      return { type: 'todos/setSelectedTodo', payload: payload };
    },
    setLoading: function (payload) {
      return { type: 'todos/setLoading', payload: payload };
    },
  },
};

const filterSlice = {
  name: 'filter',
  reducer: function (state = { query: '', status: 'all' }, action) {
    switch (action.type) {
      case 'filter/setStatus':
        return { ...state, status: action.payload };
      case 'filter/setQuery':
        return { ...state, query: action.payload };
      default:
        return state;
    }
  },
  actions: {
    setStatus: function (payload) {
      return { type: 'filter/setStatus', payload: payload };
    },
    setQuery: function (payload) {
      return { type: 'filter/setQuery', payload: payload };
    },
  },
}; // ця фігня яку ми за крейтСлайсили, кінець, тут уже йде те що робить конфігуратор

const setTodos = todosSlice.actions.setTodos;
const setSelectedTodo = todosSlice.actions.setSelectedTodo;
const setLoading = todosSlice.actions.setLoading;
const setStatus = filterSlice.actions.setStatus;
const setQuery = filterSlice.actions.setQuery;

function rootReducer(state = {}, action) {
  return {
    todos: todosSlice.reducer(state.todos, action),
    filter: filterSlice.reducer(state.filter, action),
  };
}

function configureStore(rootReducer) {
  let currentState = rootReducer(undefined, { type: '@@INIT' });
  let listeners = [];

  return {
    getState: function () {
      return currentState;
    },
    dispatch: function (action) {
      currentState = rootReducer(currentState, action);
      listeners.forEach(function (listener) {
        listener();
      });
    },
    subscribe: function (listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners = listeners.filter(function (l) {
          return l !== listener;
        });
      };
    },
  };
}

const store = configureStore(rootReducer); */
