import { AnyAction } from 'redux';
import { HANDLE_REMOVE } from './actionTypes';
import { RootState } from '.';

const reducer = (state: RootState, action: AnyAction) => {
  switch (action.type) {
    case HANDLE_REMOVE:
      return {
        ...state,
        todos: state.todos.filter(task => task.id !== action.taskId),
      };
    default:
      return state;
  }
};


export default reducer;
