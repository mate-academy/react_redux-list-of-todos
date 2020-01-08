import { combineReducers } from 'redux';
import todosWithUsers from './todoWithUsers';

const rootReducer = combineReducers({
  todosWithUsers,
});

export default rootReducer;
