import { connect } from 'react-redux';
import { removeTodoItem } from '../redux/actions';
import { TodoItem } from './TodoItem';

function mapDispatchToProps(dispatch) {
  return {
    removeTodoItem: index => dispatch(removeTodoItem(index)),
  };
}

export const TodoItemHandler = connect(null, mapDispatchToProps)(TodoItem);
