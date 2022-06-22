import { combineReducers } from 'redux';
import todosList from './todos';

const rootReducer = combineReducers({
  todosList,
});

export default rootReducer;
