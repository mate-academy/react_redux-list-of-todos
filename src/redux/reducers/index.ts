import { combineReducers } from 'redux';
import todosList from './todos/todos';

const rootReducer = combineReducers({
  todosList,
});

export default rootReducer;
