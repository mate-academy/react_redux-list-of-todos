import { createStore, combineReducers } from 'redux';
import reverseReducer from './isReversed';
import loadedReducer from './loaded';
import loadingReducer from './loading';
import todosReducer from './todos';
import sortTypeReducer from './sortType';

// const LOAD_PROCESS = 'LOAD_PROCESS';
// const SET_TODOS = 'SET_TODOS';
// const SET_LOADED = 'SET_LOADED';
// const DELETE_TODO = 'DELETE_TODO';
// const SORT_TYPE = 'SORT_TYPE';
// const REVERSE = 'REVERSE';

// export const loadProcess = (status: boolean) => ({ type: LOAD_PROCESS, status });
// export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, todos });
// export const setLoaded = () => ({ type: SET_LOADED });
// export const deleteTodo = (id: number) => ({ type: DELETE_TODO, id });
// export const setSortType = (sortType: string) => ({ type: SORT_TYPE, sortType });
// export const reverseTodos = (status: boolean) => ({ type: REVERSE, status });


export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getLoaded = (state: RootState) => state.loaded;
export const getSortType = (state: RootState) => state.sortType;
export const getReverseStatus = (state: RootState) => state.isReverse;

// const rootReducer = (state = initialState, action: AnyAction) => {
//   switch (action.type) {
//     case SET_TODOS:
//       return { ...state, todos: action.todos };

//     case LOAD_PROCESS:
//       return { ...state, loading: !state.loading };

//     case SET_LOADED:
//       return { ...state, loaded: true };

//     case DELETE_TODO:
//       return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) };

//     case SORT_TYPE:
//       return { ...state, sortType: action.sortType }

//     case REVERSE:
//       return { ...state, isReverse: action.status }

//     default:
//       return state;
//   }
// };

const rootReducer2 = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  sortType: sortTypeReducer,
  isReverse: reverseReducer,
  todos: todosReducer,
});

const initialState: any = {
  loading: false,
  loaded: false,
  sortType: 'id',
  isReverse: false,
  todos: [],
};

const store = createStore(
  rootReducer2, initialState
);

export default store;
