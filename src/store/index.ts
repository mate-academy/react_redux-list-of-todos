import { createStore, combineReducers } from 'redux';
import { loadingReducer } from './loading';
import { loadedReducer } from './loaded';
import { sortTypeReducer } from './sortType';
import { reverseReducer } from './isReversed';
import { todosReducer } from './todos';

// const rootReducer2 = (state = initialState, action: AnyAction) => {
//   switch (action.type) {
//     // case SET_TODOS:
//     //   return { ...state, todos: action.todos };

//     // case LOAD_PROCESS:
//     //   return { ...state, loading: !state.loading };

//     // case SET_LOADED:
//     //   return { ...state, loaded: true };

//     // case DELETE_TODO:
//     //   return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) };

//     // case SORT_TYPE:
//     //   return { ...state, sortType: action.sortType };

//     // case REVERSE:
//     //   return { ...state, isReverse: action.status };

//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  sortType: sortTypeReducer,
  isReverse: reverseReducer,
  todos: todosReducer,
})

const initialState: any = {
  loading: false,
  loaded: false,
  sortType: 'id',
  isReverse: false,
  todos: [],
};

const store = createStore(
  rootReducer, initialState
);

export * from './todos';
export * from './isReversed';
export * from './loaded';
export * from './loading';
export * from './sortType';
export default store;
