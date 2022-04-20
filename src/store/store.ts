import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducer';
import { Actions, RootState } from './types';

const store: Store<RootState, Actions> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;

// import { createStore, AnyAction, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { RootState } from '../react-app-env';

// // Action types - is just a constant. MUST have a unique value.
// const START_LOADING = 'START_LOADING';
// const FINISH_LOADING = 'FINISH_LOADING';
// const TODOS_LOADING = 'TODOS_LOADING';

// // Action creators - a function returning an action object
// export const startLoading = () => ({ type: START_LOADING });
// export const finishLoading = (message = 'No message') => ({
//   type: FINISH_LOADING,
//   message,
// });

// // Selectors - a function receiving Redux state and returning some data from it
// export const isLoading = (state: RootState) => state.loading;
// export const getMessage = (state: RootState) => state.message;

// const initialState: RootState = {
//   todos: [],
//   loading: false,
//   message: '',
// };

// // rootReducer - this function is called after dispatching an action
// const rootReducer = (state = initialState, action: AnyAction) => {
//   switch (action.type) {
//     case TODOS_LOADING:
//       return {
//         ...state,
//         todos: [...state.todos, ...action.payload],
//       };

//     case START_LOADING:
//       return { ...state, loading: true };

//     case FINISH_LOADING:
//       return {
//         ...state,
//         loading: false,
//         message: action.message,
//       };

//     default:
//       return state;
//   }
// };

// // The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
// );

// export default store;

// /**
//  * import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers/index'

// const store = createStore(rootReducer, applyMiddleware(thunk))
//  */
