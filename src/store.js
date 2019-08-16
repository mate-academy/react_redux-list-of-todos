import { createStore, combineReducers } from 'redux';
import loadingReducer from './redux/loading';
import todosReducer from './redux/todosData';

const reducer = combineReducers({
  isLoading: loadingReducer,
  todosData: todosReducer,
});

const store = createStore(reducer);

export default store;
