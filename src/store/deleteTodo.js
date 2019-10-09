import { deleteTodo } from './actions';

const deleteTodoFromList = itemId => (dispatch) => {
  dispatch(deleteTodo(itemId));
};

export default deleteTodoFromList;
